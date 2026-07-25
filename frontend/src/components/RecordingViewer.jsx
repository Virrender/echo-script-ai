

function RecordingViewer({ recording }) {

    return(
        <>

                <main className="flex flex-1 items-center justify-center">
      <div className="max-w-3xl">

        <h2 className="text-2xl font-bold mb-4">
          Recording #{recording.id}
        </h2>

        <p>
          {recording.transcript}
        </p>

      </div>
    </main>
        
        
        </>
    )



}
export default RecordingViewer