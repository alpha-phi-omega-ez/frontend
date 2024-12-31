import { ViewState } from "@/types/laf";

interface LAFSelectorProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
  views: ViewState[];
  view: ViewState;
}

export default function LAFSelector({
  setView,
  views,
  view,
}: LAFSelectorProps) {
  const changeSelector = (view: ViewState) => {
    setView(view);
  };

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
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
