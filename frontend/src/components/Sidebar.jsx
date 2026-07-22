import RecordingCard from "./RecordingCard";


function Sidebar({recordings, setSelected }){


    return (
        <>
        <aside>
            <button>+ New Recording</button>
        </aside>

        {recordings.map(recording => (
            <RecordingCard
                key={recording.id}
                recording={recording}
                setSelected={setSelected}
                />

        ))}



        </>



        
    );
}

export default Sidebar;