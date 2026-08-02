import { useEffect, useRef, useState } from "react";
import { Clock3 } from "lucide-react";
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
              Recording #{recording.id}
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
