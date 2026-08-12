import { useEffect, useRef, useState } from "react";
import { Clock3, Download, FileText } from "lucide-react";
import { formatRecordingDate } from "../utils/formatDate";

function RecordingViewer({ recording }) {
  // const formatedTranscript = recording.transcript.replaceAll(".", ".\n\n");
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    let url;

    async function loadAudio() {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/recordings/${recording.id}/audio`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) return;

      const blob = await response.blob();

      url = URL.createObjectURL(blob);

      setAudioUrl(url);
    }

    loadAudio();

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [recording.id]);

function downloadMarkdown() {
  const markdown = `# Recording ${recording.id}

${recording.transcript}
`;

  const blob = new Blob([markdown], {
    type: "text/markdown",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Recording-${recording.id}.md`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

async function downloadAudio() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://127.0.0.1:8000/recordings/${recording.id}/audio`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    alert("Unable to download audio.");
    return;
  }

  const blob = await response.blob();

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Recording-${recording.id}.webm`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}


  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <div
          className="
                max-w-4xl 
                mx-auto
                px-10
                py-10"
        >
          <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2F2A44] line-clamp-1">
          {recording.transcript?.slice(0, 55) || `Recording #${recording.id}`}
          {recording.transcript?.length > 55 ? "..." : ""}
        </h1>

            <div className="mt-3 flex items-center gap-2 text-gray-500">
              <Clock3 size={14}></Clock3>
              <span> {formatRecordingDate(recording.created_at)}</span>
            </div>
          </header>
          <hr className="my-8 border-gray-200" />

          <div className="mb-8">
            <audio
              ref={audioRef}
              controls
              src={audioUrl}
              className="w-full"
              onTimeUpdate={() => {
                setCurrentTime(audioRef.current.currentTime);
              }}
            />
          <div className="mt-4 flex gap-3">
          <button
            onClick={downloadAudio}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#745383]
              px-5
              py-2.5
              text-sm
              font-medium
              leading-none
              text-white
              shadow-sm
              transition
              hover:bg-[#5A3F68]
              hover:shadow
              active:scale-[0.97]
              cursor-pointer
            "
          >
            <Download
              size={16}
              strokeWidth={2}
              className="shrink-0"
            />
            <span>Download Audio</span>
          </button>

          <button
            onClick={downloadMarkdown}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D8C9DF]
              bg-white
              px-5
              py-2.5
              text-sm
              font-medium
              leading-none
              text-[#5A486E]
              shadow-sm
              transition
              hover:bg-[#F7F2FF]
              hover:border-[#C9B5D3]
              hover:shadow
              active:scale-[0.97]
              cursor-pointer
            "
          >
            <FileText
              size={16}
              strokeWidth={2}
              className="shrink-0"
            />
            <span>Download Text</span>
          </button>
        </div>
          </div>

          <article className="space-y-2 text-[17px] leading-8">
            {recording.segments?.map((segment, index) => (
              <p key={index} className="text-[#2F2A44]">
                {segment.words?.map((word, i) => {
                  const isActive = currentTime >= word.start;

                  return (
                    <span
                      key={i}
                      className={`
              px-0.5
              rounded-sm
              transition-all
              duration-150
              ${isActive ? "bg-yellow-100 text-[#2F2A44]" : ""}
            `}
                    >
                      {word.word}{" "}
                    </span>
                  );
                })}
              </p>
            ))}
          </article>
        </div>
      </main>
    </>
  );
}
export default RecordingViewer;
