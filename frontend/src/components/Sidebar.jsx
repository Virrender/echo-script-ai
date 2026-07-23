import RecordingCard from "./RecordingCard";


function Sidebar({recordings, setSelected }){


    return (
        <>
        <aside className="w-72 p-4 " >
            <button>+ New Recording</button>

            <div>

            {recordings.map(recording => (
            <RecordingCard 
                key={recording.id}
                recording={recording}
                onClick={() => setSelected(recording)}
                />

        ))}
        </div>
        </aside>

        

        </>



        
    );
}

export default Sidebar;