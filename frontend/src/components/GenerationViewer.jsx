import { useEffect, useRef, useState } from "react";
import { Clock3, Download, FileText } from "lucide-react";
import { formatRecordingDate } from "../utils/formatDate";

function GenerationViewer({ generation }) {
  // const formatedTranscript = recording.transcript.replaceAll(".", ".\n\n");
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    let url;

    async function loadAudio() {
      const token = localStorage.getItem("token");

      const response = await fetch(
       `http://127.0.0.1:8000/generation/${generation.id}/audio`,
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
  }, [generation.id]);

function downloadMarkdown() {
  const markdown = `# ${generation.title}

${generation.script}
`;

  const blob = new Blob([markdown], {
    type: "text/markdown",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${generation.title || "generation"}.md`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

async function downloadAudio() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://127.0.0.1:8000/generation/${generation.id}/audio`,
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
  link.download = `${generation.title || "generation"}.wav`;

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
            <h1 className="text-3xl font-bold text-[#F5F3FF]">
              {generation.title}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-[#AAA4B8]">
              <Clock3 size={14}></Clock3>
              <span> {formatRecordingDate(generation.created_at)}</span>
            </div>
          </header>
          <hr className="my-8 border-[#302A3A]" />

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
      hover:bg-[#e0d9ec]
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

            <article className="text-[17px] leading-8 text-[#F5F3FF]">
            {generation.segments?.map((word, index) => {
                const isActive = currentTime >= word.start;
                
                return (
                <span
                    key={index}
                    className={`
                    px-0.5
                    rounded-sm
                    transition-all
                    duration-150
                    ${
                    isActive
                        ? "bg-[#5A4520] text-[#FFF7D6]"
                        : ""
                    }
                    `}
                >
                    {word.word}{" "}
                </span>
                );
            })}
            </article>
        </div>
      </main>
    </>
  );
}
export default GenerationViewer;
