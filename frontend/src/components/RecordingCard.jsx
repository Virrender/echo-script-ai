
function RecordingCard({recording, onClick}){

    return (
        <div>
        <button 
        onClick={onClick}>
            {recording.title}
        </button>
        </div>
    )
}

export default RecordingCard