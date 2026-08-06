import RecordingCard from "./RecordingCard";
import { Plus, ChevronsRight } from "lucide-react";

function Sidebar({
  sidebarRecordings,
  selected,
  onSeeAll,
  onNewRecording,
  onSelectRecording,
  mode,
  sidebarGenerations,
  onNewGeneration
}) {

  const sidebarItems =
    mode === "echo"
        ? sidebarRecordings
        : sidebarGenerations;
  return (
    <>
      <aside
        className={`
        w-72
        px-4
        py-4
        flex
        flex-col
        min-h-0
        border-r
        transition-colors
        duration-300
        ${
          mode === "echo"
            ? "bg-[#FEFDFF] border-gray-200"
            : "bg-[#211D29] border-[#302A3A]"
        }
        `}
      >
        <button

          onClick={
    mode === "echo"
        ? onNewRecording
        : onNewGeneration
}

      className={`
      w-full
      flex
      items-center
      justify-center
      gap-2
      rounded-xl
      font-medium
      py-3
      shadow-sm
      transition
      active:scale-[0.98]
      cursor-pointer

      ${
      mode === "echo"
      ? "bg-[#745383] text-white hover:bg-[#4c2f5b]"
      : "bg-[#B58AD6] text-[#17151D] hover:bg-[#C9A3E5]"
      }
      `}
        >
          {mode === "echo"
          ? "New Recording"
          : "New Generation"}
           <Plus size={18} />{" "}
        </button>

        <div className="mt-4 ml-3 mb-3">
          <h3 className={`
      text-xs
      font-semibold
      uppercase
      tracking-wider
      ${
      mode === "echo"
      ? "text-gray-400"
      : "text-[#AAA4B8]"
      }
      `}
      >
            {mode === "echo"
          ? "Recent Recordings"
          : "Recent Generations"}
          </h3>
        </div>



        <div className={`
              flex-1
              min-h-0
              overflow-y-auto
              space-y-2
              border-y

              ${
              mode === "echo"
              ? "border-gray-300"
              : "border-[#302A3A]"
              }
              `}>
          {sidebarItems.map((recording) => (
            <RecordingCard
              key={recording.id}
              recording={recording}
              displayTitle={
                mode === "script"
                  ? recording.title
                  : undefined
              }
              onClick={() => onSelectRecording(recording)}
              isSelected={selected?.id === recording.id}
              mode={mode}
            />
          ))}
        </div>

        <button
          onClick={onSeeAll}
          className={`
            w-full
            gap-0.5
            flex
            justify-center
            items-center
            text-sm
            font-medium
            transition
            p-1
            cursor-pointer
            mt-1

            ${
            mode === "echo"
            ? "bg-white text-gray-400"
            : "bg-[#211D29] text-[#AAA4B8]"
            }
            `}
        >
          See all{" "}
          <ChevronsRight
            className="flex justify-center items-center mt-0.5 "
            size={15}
          />
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
