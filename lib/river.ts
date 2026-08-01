const SITE_ID = "USGS-07359610";
const SITE_NUMBER = "07359610";
const PARAMS = ["00060", "00065"] as const;

type RiverPoint = { time: string; value: number };
export type RiverData = {
  station: string;
  updatedAt: string | null;
  provisional: boolean;
  streamflow: number | null;
  gageHeight: number | null;
  streamflowHistory: RiverPoint[];
  gageHeightHistory: RiverPoint[];
  source: "USGS modern API" | "USGS Water Services" | "unavailable";
};

function headers() {
  const apiKey = process.env.USGS_API_KEY;
  return apiKey ? { "X-Api-Key": apiKey } : undefined;
}

async function fetchModernLatest() {
  const filter = `monitoring_location_id='${SITE_ID}' AND (parameter_code='00060' OR parameter_code='00065')`;
  const url = new URL("https://api.waterdata.usgs.gov/ogcapi/v0/collections/latest-continuous/items");
  url.searchParams.set("f", "json");
  url.searchParams.set("limit", "10");
  url.searchParams.set("filter-lang", "cql2-text");
  url.searchParams.set("filter", filter);

  const response = await fetch(url, {
    headers: headers(),
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`USGS modern API returned ${response.status}`);

  const json = await response.json() as {
    features?: Array<{ properties?: Record<string, unknown> }>;
  };
  const rows = (json.features ?? []).map((feature) => feature.properties ?? {});
  const get = (code: string) => rows.find((row) => row.parameter_code === code);
  const flow = get("00060");
  const height = get("00065");

  return {
    streamflow: typeof flow?.value === "number" ? flow.value : Number(flow?.value ?? NaN),
    gageHeight: typeof height?.value === "number" ? height.value : Number(height?.value ?? NaN),
    updatedAt: String(flow?.time ?? height?.time ?? "") || null,
    provisional: [flow, height].some((row) => row?.approval_status === "Provisional"),
  };
}

async function fetchLegacyHistory() {
  const url = new URL("https://waterservices.usgs.gov/nwis/iv/");
  url.searchParams.set("format", "json");
  url.searchParams.set("sites", SITE_NUMBER);
  url.searchParams.set("parameterCd", PARAMS.join(","));
  url.searchParams.set("period", "P2D");
  url.searchParams.set("siteStatus", "all");

  const response = await fetch(url, {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`USGS Water Services returned ${response.status}`);
  const json = await response.json() as any;
  const series = json?.value?.timeSeries ?? [];

  const parseSeries = (code: string): RiverPoint[] => {
    const match = series.find((entry: any) => entry?.variable?.variableCode?.[0]?.value === code);
    return (match?.values?.[0]?.value ?? [])
      .map((point: any) => ({ time: point.dateTime, value: Number(point.value) }))
      .filter((point: RiverPoint) => point.time && Number.isFinite(point.value));
  };

  return {
    streamflowHistory: parseSeries("00060"),
    gageHeightHistory: parseSeries("00065"),
  };
}

export async function getRiverData(): Promise<RiverData> {
  const base: RiverData = {
    station: "Caddo River near Caddo Gap — USGS 07359610",
    updatedAt: null,
    provisional: true,
    streamflow: null,
    gageHeight: null,
    streamflowHistory: [],
    gageHeightHistory: [],
    source: "unavailable",
  };

  const [latestResult, historyResult] = await Promise.allSettled([
    fetchModernLatest(),
    fetchLegacyHistory(),
  ]);

  if (historyResult.status === "fulfilled") {
    base.streamflowHistory = historyResult.value.streamflowHistory;
    base.gageHeightHistory = historyResult.value.gageHeightHistory;
    const flowLast = base.streamflowHistory.at(-1);
    const heightLast = base.gageHeightHistory.at(-1);
    base.streamflow = flowLast?.value ?? null;
    base.gageHeight = heightLast?.value ?? null;
    base.updatedAt = flowLast?.time ?? heightLast?.time ?? null;
    base.source = "USGS Water Services";
  }

  if (latestResult.status === "fulfilled") {
    const value = latestResult.value;
    base.streamflow = Number.isFinite(value.streamflow) ? value.streamflow : base.streamflow;
    base.gageHeight = Number.isFinite(value.gageHeight) ? value.gageHeight : base.gageHeight;
    base.updatedAt = value.updatedAt ?? base.updatedAt;
    base.provisional = value.provisional;
    base.source = "USGS modern API";
  }

  return base;
}
