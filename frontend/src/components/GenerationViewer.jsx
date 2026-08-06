import { useEffect, useRef, useState } from "react";
import { Clock3 } from "lucide-react";
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
            <h1 className="text-3xl font-bold text-[#2F2A44]">
              {generation.title}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-gray-500">
              <Clock3 size={14}></Clock3>
              <span> {formatRecordingDate(generation.created_at)}</span>
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
          </div>

            <article className="text-[17px] leading-8 text-[#2F2A44]">
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
                    ${isActive ? "bg-yellow-100 text-[#2F2A44]" : ""}
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
