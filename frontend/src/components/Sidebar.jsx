import RecordingCard from "./RecordingCard";
import { Plus } from "lucide-react";

function Sidebar({ recordings, setSelected, selected, onNewRecording }) {
  return (
    <>
      <aside className="
        w-72
        bg-[#fefdff]
        border-r
        border-gray-200
        px-4
        py-6
        flex
        flex-col
        min-h-0
        "
        >
        <button
          onClick={onNewRecording}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2

            rounded-xl

            bg-[#745383]
            text-white

            font-medium

            py-3

            shadow-sm

            transition

            hover:bg-[#4c2f5b]
            active:scale-[0.98]

            cursor-pointer
            "
        >
          New Recording <Plus size={18} />{" "}
        </button>

        <div className="mt-8 ml-3 mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Recent Recordings
            </h3>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {recordings.map((recording) => (
            <RecordingCard
              key={recording.id}
              recording={recording}
              onClick={() => setSelected(recording)}
              isSelected={selected?.id === recording.id}
            />
          ))}
        </div>

      </aside>
    </>
  );
}

export default Sidebar;
