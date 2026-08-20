import { connection } from "next/server";

import type { Backtest, Course } from "@/types/backtest";

function getBackendServer(): string {
  const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
  if (!backendServer) {
    throw new Error("NEXT_PUBLIC_BACKEND_SERVER is not configured");
  }
  return backendServer;
}

async function fetchBacktestData<T>(path: string): Promise<T> {
  await connection();

  const response = await fetch(`${getBackendServer()}${path}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  const json = (await response.json()) as { data?: unknown };

  if (!Array.isArray(json.data)) {
    throw new Error(`Invalid data for ${path}: expected an array`);
  }

  return json.data as T;
}

export async function getCourseCodes(): Promise<string[]> {
  return fetchBacktestData<string[]>("/coursecodes/");
}

export async function getCourses(code: string): Promise<Course[]> {
  return fetchBacktestData<Course[]>(`/courses/${encodeURIComponent(code)}`);
}

export async function getBacktests(courseId: string): Promise<Backtest[]> {
  return fetchBacktestData<Backtest[]>(
    `/backtest/${encodeURIComponent(courseId)}`
  );
}
