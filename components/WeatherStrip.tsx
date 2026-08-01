"use client";

import { useEffect, useState } from "react";
import type { WeatherData, WeatherDay } from "@/lib/weather";
import { site } from "@/lib/site";

function conditionKind(text: string) {
  const value = text.toLowerCase();
  if (value.includes("thunder")) return "storm";
  if (value.includes("snow") || value.includes("sleet") || value.includes("ice")) return "snow";
  if (value.includes("rain") || value.includes("shower")) return "rain";
  if (value.includes("cloud") || value.includes("fog") || value.includes("overcast")) return "cloud";
  return "sun";
}

function WeatherIcon({ forecast }: { forecast: string }) {
  const kind = conditionKind(forecast);
  return (
    <span className={`weather-icon weather-icon-${kind}`} aria-hidden="true">
      <span className="weather-sun" />
      <span className="weather-cloud" />
      <span className="weather-rain" />
    </span>
  );
}

function dayLabel(period: WeatherDay) {
  const date = new Date(period.startTime);
  if (Number.isNaN(date.getTime())) return period.name;
  return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "America/Chicago" }).format(date);
}

export function WeatherStrip() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/weather", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Weather unavailable");
        return response.json();
      })
      .then((value) => active && setData(value))
      .catch(() => active && setFailed(true));
    return () => { active = false; };
  }, []);

  const forecast = data?.forecast ?? [];
  const current = data?.current;

  return (
    <section className="weather-band" aria-labelledby="weather-heading">
      {data?.alerts?.length ? (
        <div className="weather-alert">
          <div className="shell"><strong>{data.alerts[0].event}:</strong> {data.alerts[0].headline}</div>
        </div>
      ) : null}
      <div className="shell weather-layout">
        <a className="weather-current" href={data?.sourceUrl ?? site.weatherUrl} target="_blank" rel="noreferrer">
          <div>
            <span className="weather-kicker" id="weather-heading">Caddo River Weather</span>
            <span className="weather-source">National Weather Service forecast</span>
          </div>
          {current ? <WeatherIcon forecast={current.shortForecast} /> : <span className="weather-loader" aria-hidden="true" />}
          <div className="weather-temp">
            <strong>{current ? `${Math.round(current.temperature)}°` : failed ? "--" : "…"}</strong>
            <span>{current?.shortForecast ?? (failed ? "Forecast unavailable" : "Loading forecast")}</span>
          </div>
        </a>

        <div className="weather-days" aria-label="Seven day weather forecast">
          {forecast.length ? forecast.map((period) => (
            <a href={data?.sourceUrl ?? site.weatherUrl} target="_blank" rel="noreferrer" className="weather-day" key={period.startTime}>
              <span>{dayLabel(period)}</span>
              <WeatherIcon forecast={period.shortForecast} />
              <strong>{Math.round(period.high)}° <i>{period.low !== null ? `${Math.round(period.low)}°` : ""}</i></strong>
              <small>{period.precipitationChance !== null ? `${Math.round(period.precipitationChance)}% rain` : period.shortForecast}</small>
            </a>
          )) : Array.from({ length: 7 }).map((_, index) => (
            <div className="weather-day is-loading" key={index}><span>--</span><span className="weather-loader" /><strong>--</strong><small>{failed ? "Unavailable" : "Loading"}</small></div>
          ))}
        </div>
      </div>
    </section>
  );
}
