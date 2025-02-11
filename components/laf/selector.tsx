import { ViewState } from "@/types/laf";
import { useEffect, useState } from "react";
import { Badge } from "@heroui/react";

interface LAFSelectorProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
  view: ViewState;
}

export default function LAFSelector({ setView, view }: LAFSelectorProps) {
  const views: ViewState[] = [
    "Found Item",
    "Lost Items",
    "Submit Lost Report",
    "Find Lost Report",
    "New Lost Reports",
    "Expired Items",
    // "Archive",
  ];

  const changeSelector = (view: ViewState) => {
    setView(view);
  };

  const [newLostReports, setNewLostReports] = useState(0);

  const fetchNewLostReports = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/laf/report/new/count`,
      {
        credentials: "include",
      }
    );
    if (data.ok) {
      const json = await data.json();
      setNewLostReports(json.data);
    }
  };

  useEffect(() => {
    fetchNewLostReports();
    const interval = setInterval(fetchNewLostReports, 15000);
    return () => clearInterval(interval);
  }, [view]);

  return (
    <div className="flex items-center justify-center my-10">
      <div className="flex items-center justify-around rounded-full bg-gray-400 p-2 overflow-hidden">
        {views.map((item, index) => (
          <button
            key={index}
            onClick={() => changeSelector(item)}
            className={`flex-1 mx-1 py-2 px-2 rounded-full text-center transition-all duration-300 
              ${
                view === item
                  ? "bg-blue-500 shadow-md text-black"
                  : "bg-transparent text-gray-700"
              }`}
          >
            {item !== "New Lost Reports" && item}
            {item === "New Lost Reports" && newLostReports === 0 && item}
            {item === "New Lost Reports" && newLostReports > 0 && (
              <Badge
                color="danger"
                className="ml-2"
                content={newLostReports}
                showOutline={false}
              >
                {item}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
