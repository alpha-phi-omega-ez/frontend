import type { Metadata } from "next";
import { Suspense } from "react";

import LAFClient from "@/app/laf/laf-client";
import { title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Lost & Found",
};

/** Types and locations are admin managed, cache for 1 hour. */
const LAF_REVALIDATE_SECONDS = 60 * 60;

function getBackendServer(): string {
  const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
  if (!backendServer) {
    throw new Error("NEXT_PUBLIC_BACKEND_SERVER is not configured");
  }
  return backendServer;
}

async function fetchLAFData<T extends unknown[]>(path: string): Promise<T> {
  const response = await fetch(`${getBackendServer()}${path}`, {
    next: { revalidate: LAF_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  const json = (await response.json()) as { data?: unknown };

  if (!Array.isArray(json.data)) {
    throw new Error(`Invalid data for ${path}: expected an array`);
  }

  return json.data as T;
}

async function LAFSection() {
  const [lafTypes, lafLocations] = await Promise.all([
    fetchLAFData<string[]>("/laf/types/"),
    fetchLAFData<string[]>("/laf/locations/"),
  ]);

  return <LAFClient lafTypes={lafTypes} lafLocations={lafLocations} />;
}

function LAFSectionFallback() {
  return (
    <div className="animate-pulse flex justify-center">
      <div className="h-14 w-full max-w-4xl rounded-full bg-default-200" />
    </div>
  );
}

export default function LAFPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center mb-6">
        <h1 className={title()}>Lost & Found</h1>
      </div>
      <Suspense fallback={<LAFSectionFallback />}>
        <LAFSection />
      </Suspense>
    </section>
  );
}
