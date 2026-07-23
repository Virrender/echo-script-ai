import RecordingCard from "./RecordingCard";
import { Plus } from 'lucide-react';

function Sidebar({recordings, setSelected, selected }){


    return (
        <>
        <aside className="w-72 p-4 h-screen  " >
            <button  className=" flex items-center gap-2 w-full p-3 rounded text-left"
            >
                 New Recording <Plus size={18}/> </button>

            <div>

            {recordings.map(recording => (
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