
function RecordingCard({recording, onClick, isSelected}){

    
        return (
            <>

            <div>
            <button 
            className={
                `w-full p-3 rounded text-left cursor-pointer  ${isSelected ? "bg-violet-100":""}`
            }
            onClick={onClick}>
                {recording.created_at}
            </button>
            </div>

            </>
        )

}

export default RecordingCard