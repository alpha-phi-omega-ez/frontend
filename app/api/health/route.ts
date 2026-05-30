import { NextResponse } from "next/server";

interface HealthResponse {
  status: string;
  timestamp: string;
}

export function GET() {
  return NextResponse.json<HealthResponse>({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
