import { title } from "@/components/primitives";
import { useState, useEffect } from "react";
import Error from "@/components/error";
import LAFSelector from "@/components/laf/selector";
import FoundItemForm from "@/components/laf/found-item";
import NewLostReport from "@/components/laf/create-lost-report";
import LostItems from "@/components/laf/lost-items";
import LostReports from "@/components/laf/lost-reports";
import ExpiredItems from "@/components/laf/expired-items";
import NewLostReports from "@/components/laf/new-lost-reports";
import { useAuth } from "@/context/AuthContext";
import { ViewState } from "@/types/laf";
import { fetchNewLostReports } from "@/utils/laf";

interface LAFPageProps {
  lafTypes: string[];
  lafLocations: string[];
}

export default function LAFPage({ lafTypes, lafLocations }: LAFPageProps) {
  const { auth, checkAuthStatus } = useAuth();
  const isAuthenticated = auth.isAuthenticated;

  const [view, setView] = useState<ViewState>("Found Item");
  const [loading, setLoading] = useState(true);
  const [newLostReports, setNewLostReports] = useState(0);

  useEffect(() => {
    if (lafTypes && lafLocations) {
      setLoading(false);
    }
  }, [lafTypes, lafLocations]);

  useEffect(() => {
    checkAuthStatus();
    fetchNewLostReports(setNewLostReports);
    const interval = setInterval(fetchNewLostReports, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [view]);

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
          <LAFSelector
            view={view}
            setView={setView}
            newLostReports={newLostReports}
          />
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
              display: view === "New Lost Reports" ? "block" : "none",
            }}
          >
            <NewLostReports view={view} setNewLostReports={setNewLostReports} />
          </div>
          <div
            style={{
              display: view === "Expired Items" ? "block" : "none",
            }}
          >
            <ExpiredItems lafTypes={lafTypes} view={view} />
          </div>
        </>
      )}
      {!loading && !isAuthenticated && (
        <>
          <p className="w-2/3 mx-auto mb-8 text-justify">
            Submit a lost report for any items you have lost and provide contact
            information so we can contact you if we find your item. You can also
            visit our office in Union 3420 we are open every day class is in
            session 10am-5pm.
          </p>
          <NewLostReport
            lafTypes={lafTypes}
            lafLocations={lafLocations}
            view={view}
            switchToLostReport={switchToLostReport}
            setSwitchToLostReport={setSwitchToLostReport}
          />
        </>
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
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/types/`
  ).then((res) => res.json());
  const lafLocations = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/locations/`
  ).then((res) => res.json());
  return {
    props: { lafTypes: lafTypes["data"], lafLocations: lafLocations["data"] },
  };
}
