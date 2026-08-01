import { NextResponse } from "next/server";
import { getWeatherData } from "@/lib/weather";

export const revalidate = 1800;

export async function GET() {
  try {
    const data = await getWeatherData();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
    });
  } catch {
    return NextResponse.json(
      { error: "The local forecast is temporarily unavailable." },
      { status: 503 },
    );
  }
}
