
function RecordingCard({ recording, setSelected }){

    return (
        <button onClick={()=> setSelected(recording)}>
            Recording {recording.id}
        </button>
    )
}

export default RecordingCard