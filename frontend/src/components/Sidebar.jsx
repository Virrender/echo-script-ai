import RecordingCard from "./RecordingCard";


function Sidebar({recordings, setSelected, selected }){


    return (
        <>
        <aside className="w-72 p-4 h-screen " >
            <button className="w-full p-3 rounded text-left"
            >
                 New Recording +  </button>

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