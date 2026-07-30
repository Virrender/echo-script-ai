import RecordingCard from "./RecordingCard";
import { Plus, ChevronsRight } from "lucide-react";

import {useState, useEffect } from "react";


function Sidebar({ 
  selected, 
  onNewRecording, onSeeAll, 
  onSelectRecording, }) 
  
  {
  
const [sidebarRecordings, setSidebarRecordings] = useState([]);


async function loadSidebarRecordings(page,limit) {
    const token = localStorage.getItem("token");

    const response = await fetch(
     ` http://127.0.0.1:8000/recordings?page=${page}&limit=${limit}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    if (response.ok) {
      setSidebarRecordings(data.items);
    } else {
      console.error(data);
    }
  }




  useEffect(() => {
    loadSidebarRecordings(1,10); // this is just new React ESLint rule, we can ignore it
  },[]);




  return (
    <>
      <aside
        className="
        w-72
        bg-[#fefdff]
        border-r
        border-gray-200
        px-4
        py-4
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

        <div className="mt-4 ml-3 mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Recent Recordings
          </h3>
        </div>

        <div className="flex-1  min-h-0  overflow-y-auto space-y-2 border-y border-gray-300">

          {sidebarRecordings.map((recording) => (
            <RecordingCard
              key={recording.id}
              recording={recording}
              onClick={() => onSelectRecording(recording)}
              isSelected={selected?.id === recording.id}

            />
          ))}
        </div>
                  

        <button 
        onClick={onSeeAll}
        className=" w-full gap-0.5 flex justify-center items-center  bg-white text-sm font-medium transition p-1 cursor-pointer text-gray-400  mt-1">
          See all   <ChevronsRight className="flex justify-center items-center mt-0.5 " size={15}/>
        </button>

      </aside>
    </>
  );
}

export default Sidebar;
