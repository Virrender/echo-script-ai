import { Clock3 } from "lucide-react";


import { formatRecordingDate } from "../utils/formatDate";



function RecordingCard({ recording, onClick, isSelected }) {
  return (
    <>
      
        <button
className={`
w-full
rounded-xl
p-4
text-left

border
border-transparent

transition-all
duration-200

cursor-pointer

hover:bg-[#F7F2FF]
hover:border-[#E5D7F7]
hover:shadow-sm

active:scale-[0.95]

${
    isSelected
        ? "bg-[#F1E8FF] border-[#C9A9F5] border-l-4"
        : "bg-transparent border-l-4 border-l-transparent"
}
`}          
          onClick={onClick}
        >
          <p className="text-sm font-semibold text-[#2F2A44] leading-6 line-clamp-1">
            {recording.transcript}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-gray-500">
            <Clock3 size={13} strokeWidth={2}/>
            <span className="text-xs font-normal ">
               {formatRecordingDate(recording.created_at)}
            </span>
            
          </div>

          <p >
            
          </p>
          
        </button>
  
    </>
  );
}

export default RecordingCard ;
