import { Clock3 } from "lucide-react";

import { formatRecordingDate } from "../utils/formatDate";

function RecordingCard({ 
  recording, 
  onClick, 
  isSelected,
  displayTitle,
  mode,
 }) {
  return (
    <>
      <button
        className={`
            w-full
            rounded-xl
            p-2
            text-left
            border
            border-transparent
            transition-all
            duration-200
            cursor-pointer

              ${
              mode === "echo"
              ? `
              hover:bg-[#F7F2FF]
              hover:border-[#E5D7F7]
              `
              : `
              hover:bg-[#3A3247]
              hover:border-[#51435F]
              `
              }
            hover:shadow-sm
            active:scale-[0.95]

              ${
              isSelected
              ?
              mode === "echo"
              ?
              "bg-[#F1E8FF] border-[#C9A9F5] border-l-4"
              :
              "bg-[#564276] border-[#B58AD6] border-l-4"
              :
              mode === "echo"
?
              "bg-transparent border-l-4 border-l-transparent"
              :
              "bg-[#474154] border-l-4 border-l-transparent"
              }

              `}
        onClick={onClick}
      >
        <p className={`
        text-sm 
        font-semibold
         ${mode === "echo"
        ? "text-[#2F2A44]"
        : "text-[#E8E1F2]"
          } 
        leading-6 line-clamp-1`}
        >
          {displayTitle ?? recording.transcript}
        </p>

        <div className={`
          mt-3 
          flex 
          items-center 
          gap-1.5
          ${
          mode === "echo"
          ? "text-gray-500"
          : "text-[#AAA4B8]"
          }
           `}>
          <Clock3 size={13} strokeWidth={2} />
          <span className="text-xs font-normal ">
            {formatRecordingDate(recording.created_at)}
          </span>
        </div>
      </button>
    </>
  );
}

export default RecordingCard;
