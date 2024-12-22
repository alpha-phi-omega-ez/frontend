import { useState } from "react";
import { ViewState } from "@/types/laf";

interface LAFSelectorProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
  views: ViewState[];
}

export default function LAFSelector({ setView, views }: LAFSelectorProps) {
  const [active, setActive] = useState<number>(0);

  const changeSelector = (
    index: number,
    view: LAFSelectorProps["views"][number]
  ) => {
    setActive(index);
    setView(view);
  };

  return (
    <div className="flex items-center justify-center mt-10 mb-10">
      <div className="flex items-center justify-around rounded-full bg-gray-400 p-2 overflow-hidden">
        {views.map((item, index) => (
          <button
            key={index}
            onClick={() => changeSelector(index, item)}
            className={`flex-1 mx-1 py-2 rounded-full text-center transition-all duration-300 
            ${
              active === index
                ? "bg-blue-500 shadow-md text-black"
                : "bg-transparent text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
