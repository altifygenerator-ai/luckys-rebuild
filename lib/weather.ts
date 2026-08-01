const LATITUDE = 34.3268;
const LONGITUDE = -93.5507;
const NWS_HEADERS = {
  Accept: "application/geo+json",
  "User-Agent": "caddocanoeandkayak.com (info@caddocanoeandkayak.com)",
};

export type WeatherPeriod = {
  name: string;
  startTime: string;
  temperature: number;
  temperatureUnit: "F" | "C";
  shortForecast: string;
  precipitationChance: number | null;
  windSpeed: string;
  windDirection: string;
};

export type WeatherDay = {
  name: string;
  startTime: string;
  high: number;
  low: number | null;
  temperatureUnit: "F" | "C";
  shortForecast: string;
  precipitationChance: number | null;
};

export type WeatherData = {
  location: string;
  updatedAt: string | null;
  current: WeatherPeriod | null;
  forecast: WeatherDay[];
  alerts: Array<{ event: string; headline: string; severity: string }>;
  sourceUrl: string;
};

function normalizePeriod(period: any): WeatherPeriod {
  return {
    name: String(period?.name ?? "Forecast"),
    startTime: String(period?.startTime ?? ""),
    temperature: Number(period?.temperature ?? 0),
    temperatureUnit: period?.temperatureUnit === "C" ? "C" : "F",
    shortForecast: String(period?.shortForecast ?? "Forecast unavailable"),
    precipitationChance:
      typeof period?.probabilityOfPrecipitation?.value === "number"
        ? period.probabilityOfPrecipitation.value
        : null,
    windSpeed: String(period?.windSpeed ?? ""),
    windDirection: String(period?.windDirection ?? ""),
  };
}

function buildDays(periods: any[]): WeatherDay[] {
  const days: WeatherDay[] = [];
  for (let index = 0; index < periods.length && days.length < 7; index += 1) {
    const period = periods[index];
    if (!period?.isDaytime) continue;
    const day = normalizePeriod(period);
    const night = periods.slice(index + 1).find((candidate: any) => !candidate?.isDaytime);
    days.push({
      name: day.name,
      startTime: day.startTime,
      high: day.temperature,
      low: typeof night?.temperature === "number" ? night.temperature : null,
      temperatureUnit: day.temperatureUnit,
      shortForecast: day.shortForecast,
      precipitationChance: day.precipitationChance,
    });
  }
  return days;
}

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: NWS_HEADERS,
    next: { revalidate: 1800 },
    signal: AbortSignal.timeout(9000),
  });
  if (!response.ok) throw new Error(`NWS returned ${response.status}`);
  return response.json();
}

export async function getWeatherData(): Promise<WeatherData> {
  const pointUrl = `https://api.weather.gov/points/${LATITUDE},${LONGITUDE}`;
  const point = await fetchJson(pointUrl);
  const forecastUrl = point?.properties?.forecast;
  const hourlyUrl = point?.properties?.forecastHourly;
  if (!forecastUrl || !hourlyUrl) throw new Error("NWS forecast links were unavailable");

  const alertsUrl = `https://api.weather.gov/alerts/active?point=${LATITUDE},${LONGITUDE}`;
  const [forecastResult, hourlyResult, alertsResult] = await Promise.allSettled([
    fetchJson(forecastUrl),
    fetchJson(hourlyUrl),
    fetchJson(alertsUrl),
  ]);

  if (forecastResult.status !== "fulfilled") throw forecastResult.reason;

  const periods = forecastResult.value?.properties?.periods ?? [];
  const forecast = buildDays(periods);
  const hourly = hourlyResult.status === "fulfilled" ? (hourlyResult.value?.properties?.periods ?? []) : [];
  const current = hourly[0] ? normalizePeriod(hourly[0]) : periods[0] ? normalizePeriod(periods[0]) : null;
  const alerts = alertsResult.status === "fulfilled"
    ? (alertsResult.value?.features ?? []).slice(0, 3).map((feature: any) => ({
        event: String(feature?.properties?.event ?? "Weather alert"),
        headline: String(feature?.properties?.headline ?? feature?.properties?.event ?? "Weather alert"),
        severity: String(feature?.properties?.severity ?? "Unknown"),
      }))
    : [];

  return {
    location: "Caddo River near Glenwood",
    updatedAt: forecastResult.value?.properties?.updated ?? current?.startTime ?? null,
    current,
    forecast,
    alerts,
    sourceUrl: "https://forecast.weather.gov/MapClick.php?lat=34.3268&lon=-93.5507",
  };
}
