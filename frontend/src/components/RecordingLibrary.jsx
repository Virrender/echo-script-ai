
import RecordingCard from "./RecordingCard"

function RecordingLibrary({recordings} ){

    return (<>

 <div className="flex-1  min-h-0  overflow-y-auto space-y-2 border-y border-gray-300">
          {recordings.map((recording) => (
            <RecordingCard
              key={recording.id}
              recording={recording}
            />
          ))}
        </div>

    
    </>)
}

export default RecordingLibrary