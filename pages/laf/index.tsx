import { title } from "@/components/primitives";
import { useState, useEffect } from "react";
import Error from "@/components/error";
import LAFSelector from "@/components/laf/selector";
import FoundItemForm from "@/components/laf/found-item";
import NewLostReport from "@/components/laf/create-lost-report";
import LostItems from "@/components/laf/lost-items";
import LostReports from "@/components/laf/lost-reports";
import ExpiredItems from "@/components/laf/expired-items";
import { useAuth } from "@/context/AuthContext";
import { ViewState } from "@/types/laf";

interface LAFPageProps {
  lafTypes: string[];
  lafLocations: string[];
}

export default function LAFPage({ lafTypes, lafLocations }: LAFPageProps) {
  const { auth, checkAuthStatus } = useAuth();
  const isAuthenticated = auth.isAuthenticated;

  const [view, setView] = useState<ViewState>("Found Item");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lafTypes && lafLocations) {
      setLoading(false);
    }
  }, [lafTypes, lafLocations]);

  useEffect(() => {
    checkAuthStatus();
  }, [view]);

  const views: ViewState[] = [
    "Found Item",
    "Lost Items",
    "Submit Lost Report",
    "Find Lost Report",
    // "Matching Lost Reports",
    "Expired Items",
    // "Archive",
  ];

  const [switchToLostReport, setSwitchToLostReport] = useState<Record<
    string,
    string
  > | null>(null);

  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center mb-6">
        <h1 className={title()}>Lost & Found</h1>
      </div>
      {!loading && isAuthenticated && (
        <>
          <LAFSelector view={view} setView={setView} views={views} />
          <div
            style={{
              display: view === "Found Item" ? "block" : "none",
            }}
          >
            <FoundItemForm
              lafTypes={lafTypes}
              lafLocations={lafLocations}
              view={view}
            />
          </div>
          <div
            style={{
              display: view === "Lost Items" ? "block" : "none",
            }}
          >
            <LostItems
              lafTypes={lafTypes}
              lafLocations={lafLocations}
              view={view}
              setSwitchToLostReport={setSwitchToLostReport}
              setView={setView}
            />
          </div>
          <div
            style={{
              display: view === "Submit Lost Report" ? "block" : "none",
            }}
          >
            <NewLostReport
              lafTypes={lafTypes}
              lafLocations={lafLocations}
              view={view}
              switchToLostReport={switchToLostReport}
              setSwitchToLostReport={setSwitchToLostReport}
            />
          </div>
          <div
            style={{
              display: view === "Find Lost Report" ? "block" : "none",
            }}
          >
            <LostReports
              lafTypes={lafTypes}
              lafLocations={lafLocations}
              view={view}
            />
          </div>
          <div
            style={{
              display: view === "Matching Lost Reports" ? "block" : "none",
            }}
          >
            <p>Matching Lost Reports in progress</p>
          </div>
          <div
            style={{
              display: view === "Expired Items" ? "block" : "none",
            }}
          >
            <ExpiredItems lafTypes={lafTypes} view={view} />
          </div>
          <div
            style={{
              display: view === "Archive" ? "block" : "none",
            }}
          >
            <p>Archive in progress</p>
          </div>
        </>
      )}
      {!loading && !isAuthenticated && (
        <NewLostReport
          lafTypes={lafTypes}
          lafLocations={lafLocations}
          view={view}
          switchToLostReport={switchToLostReport}
          setSwitchToLostReport={setSwitchToLostReport}
        />
      )}
      <div
        style={{
          display: view === "error" ? "block" : "none",
        }}
      >
        <Error title="Failed to load Lost and Found" />
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  const lafTypes = await fetch(
    `${process.env.NEXT_INTERNAL_BACKEND_SERVER}/laf/types/`
  ).then((res) => res.json());
  const lafLocations = await fetch(
    `${process.env.NEXT_INTERNAL_BACKEND_SERVER}/laf/locations/`
  ).then((res) => res.json());
  return {
    props: { lafTypes: lafTypes["data"], lafLocations: lafLocations["data"] },
  };
}
