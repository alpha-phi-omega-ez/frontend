import { title } from "@/components/primitives";
import { useState } from "react";
import Error from "@/components/error";
import { Badge } from "@nextui-org/badge";
import LAFSelector from "@/components/laf/selector";
import FoundItemForm from "@/components/laf/found-item";
import NewLostReport from "@/components/laf/create-lost-report";
import { useAuth } from "@/context/AuthContext";
import { ViewState } from "@/types/laf";

interface LAFPageProps {
  lafTypes: string[];
  lafLocations: string[];
}

export default function LAFPage({ lafTypes, lafLocations }: LAFPageProps) {
  const { auth } = useAuth();
  const isAuthenticated = auth.isAuthenticated;

  const [view, setView] = useState<ViewState>("Found Item");

  const views: ViewState[] = [
    "Found Item",
    "Lost Items",
    "Submit Lost Report",
    "Find Lost Report",
    "Matching Lost Reports",
    "Expired Items",
    "Archive",
  ];

  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center mb-6">
        <h1 className={title()}>Lost & Found</h1>
      </div>
      {isAuthenticated && (
        <>
          <LAFSelector setView={setView} views={views} />
          <div
            style={{
              display: view === "Found Item" ? "block" : "none",
            }}
          >
            <FoundItemForm lafTypes={lafTypes} lafLocations={lafLocations} />
          </div>
          <div
            style={{
              display: view === "Lost Items" ? "block" : "none",
            }}
          >
            <p>Lost items in progress</p>
          </div>
          <div
            style={{
              display: view === "Submit Lost Report" ? "block" : "none",
            }}
          >
            <NewLostReport lafTypes={lafTypes} lafLocations={lafLocations} />
          </div>
          <div
            style={{
              display: view === "Find Lost Report" ? "block" : "none",
            }}
          >
            <p>Find Lost report in progress</p>
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
            <p>Expired items in progress</p>
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
      {!isAuthenticated && (
        <div className="text-center">
          <NewLostReport lafTypes={lafTypes} lafLocations={lafLocations} />
        </div>
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
