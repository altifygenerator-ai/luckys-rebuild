"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import type { RiverData } from "@/lib/river";

function formatNumber(value: number | null, digits = 1) {
  if (value === null || !Number.isFinite(value)) return "Unavailable";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function formatTime(value: string | null) {
  if (!value) return "Update unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Update unavailable";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
    timeZoneName: "short",
  }).format(date);
}

function Sparkline({ points, label }: { points: Array<{ time: string; value: number }>; label: string }) {
  const path = useMemo(() => {
    if (points.length < 2) return "";
    const values = points.map((point) => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const spread = Math.max(max - min, 0.001);
    return points.map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 38 - ((point.value - min) / spread) * 32;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
  }, [points]);

  if (!path) return <div className="chart-empty">Recent graph unavailable</div>;

  return (
    <svg className="sparkline" viewBox="0 0 100 42" role="img" aria-label={`${label} over the last 48 hours`} preserveAspectRatio="none">
      <line x1="0" y1="38" x2="100" y2="38" />
      <path d={path} />
    </svg>
  );
}

export function RiverLevels({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<RiverData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/river", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("River data unavailable");
        return response.json();
      })
      .then((value) => active && setData(value))
      .catch(() => active && setError(true));
    return () => { active = false; };
  }, []);

  if (compact) {
    return (
      <div className="footer-river">
        <h3>Current River Levels</h3>
        <dl>
          <div><dt>Streamflow</dt><dd>{data ? `${formatNumber(data.streamflow)} ft³/s` : error ? "Unavailable" : "Loading…"}</dd></div>
          <div><dt>Gage height</dt><dd>{data ? `${formatNumber(data.gageHeight, 2)} ft` : error ? "Unavailable" : "Loading…"}</dd></div>
        </dl>
        <a href={site.usgsUrl} target="_blank" rel="noreferrer">View official USGS station</a>
      </div>
    );
  }

  return (
    <section className="river-panel" aria-labelledby="river-heading">
      <div className="river-heading-row">
        <div>
          <p className="eyebrow">USGS station 07359610</p>
          <h2 id="river-heading">Current River Levels</h2>
          <p className="river-note">Live readings from the Caddo River near Caddo Gap. Data is provisional and should not be treated as an operating or safety decision.</p>
        </div>
        <a href={site.usgsUrl} target="_blank" rel="noreferrer">Full USGS details</a>
      </div>

      <div className="river-readings">
        <div className="reading-block">
          <span>Streamflow</span>
          <strong>{data ? formatNumber(data.streamflow) : error ? "Unavailable" : "Loading…"}</strong>
          <small>cubic feet per second</small>
          {data && <Sparkline points={data.streamflowHistory} label="Streamflow" />}
        </div>
        <div className="reading-block">
          <span>Gage height</span>
          <strong>{data ? formatNumber(data.gageHeight, 2) : error ? "Unavailable" : "Loading…"}</strong>
          <small>feet</small>
          {data && <Sparkline points={data.gageHeightHistory} label="Gage height" />}
        </div>
      </div>

      <p className="river-updated">{data ? `Last reading: ${formatTime(data.updatedAt)}` : error ? "USGS readings could not be loaded right now." : "Loading the latest USGS reading…"}</p>
    </section>
  );
}

export function RiverLevelsCompact() {
  return <RiverLevels compact />;
}
