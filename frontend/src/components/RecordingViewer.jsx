import { Clock3 } from "lucide-react";
import { formatRecordingDate } from "../utils/formatDate";

function RecordingViewer({ recording }) {

          const formatedTranscript= recording.transcript.replaceAll(".", ".\n\n")

    return(
        <>

    <main className="flex-1 overflow-y-auto">
      <div 
      className="
                max-w-4xl 
                mx-auto
                px-10
                py-10">

<header className="mb-8">


    <h1 className="text-3xl font-bold text-[#2F2A44]">
          Recording #{recording.id}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-gray-500">
          <Clock3 size={14}></Clock3>
          <span> {formatRecordingDate(recording.created_at)}
</span>
        </div>

</header>
<hr className="my-8 border-gray-200" />
        
        <article>
        <p className="
        whitespace-pre-line
        text-[17px]
         leading-8
        text-[#2F2A44]" >

          {formatedTranscript}
        </p>
        </article>







      </div>
    </main>
        
        
        </>
    )



}
export default RecordingViewer