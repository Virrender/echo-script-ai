
import { useRef } from "react";
import { useState } from "react";
import { Audio, ThreeDots } from "react-loader-spinner";

import { Clock3 ,BadgeCheck} from "lucide-react";
import { formatRecordingDate } from "../utils/formatDate";

function RecordingScreen( {refreshRecording}){


  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  async function startRecording() {
    audioChunksRef.current = [];
    setTranscript("");
    setIsCompleted(false);
    setSeconds(0);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    streamRef.current = stream;

    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
      audioBitsPerSecond: 64000,
    });

    recorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    recorder.onstop = async () => {
      setIsUploading(true);

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/recordings/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setTranscript(data.transcript);
      } else {
        console.error(data);
      }

      setIsUploading(false);
      await refreshRecording();
      setIsCompleted(true);
    };

    recorder.start();
    setIsRecording(true);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  function stopRecording() {
    recorderRef.current.stop();
    clearInterval(intervalRef.current);
    setIsRecording(false);
  }

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

 if (isUploading) {
      return (

        <main           
        className="
flex flex-1  flex-col items-center justify-center

            ">
          <div
  className="
            flex
            flex-col
            items-center
            bg-stone-100
            rounded-3xl
            shadow-lg
            px-14
            py-12
            "
 >

              <h1
              className="
                text-3xl
                font-bold
                text-[#2F2A44]
                mt-4
                "
              >
                Creating your transcript </h1>
              <p
              className="
                mt-6
                text-center
                text-sm
                text-gray-500
                "
                              
              >
                Converting speech into searchable text.</p>

                <ThreeDots
                  visible={true}
                  height="70"
                  width="70"
                  color="#745383"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  />
              <p
              className="
                  mt-6
                  text-sm
                  text-gray-400
                  "
              >
                This usually takes a few seconds.</p>

          </div>

        </main>

      );
    }


if (isCompleted) {
      return (
        <div className="flex flex-1  flex-col items-center px-10 py-10 justify-center">
          {transcript && (
            <div >
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-6 w-6 mt-2 text-green-500" />
                              <h3 className="
                text-3xl

                font-bold

                text-[#2F2A44]
                ">
                   Transcript Ready</h3>
              </span>

                      {/* <div className="mt-3 flex items-center gap-2 text-gray-400">
          <Clock3 size={14}></Clock3>
          <span> {formatRecordingDate(refreshRecording.created_at)}
</span>
        </div> */}

        <hr className="my-6 border-gray-200" />

          <div
className="
bg-[#FAF9FC]

rounded-2xl

p-6
"
>

<p
className="
leading-8

text-gray-700

whitespace-pre-wrap
"
>
{transcript}
</p>

</div>
            </div>
          )}
        </div>
      );
    };


//   starting or recording screen

    return(

<main className="flex flex-1  flex-col items-center justify-center">

  <div  className="
              w-full
            max-w-md
            min-h-[380px]
            flex
            flex-col
            items-center
            justify-center
            bg-stone-100
            rounded-3xl
            shadow-lg
            px-14
            py-12
            "
>

<div>
  <h1
    className={` text-center ${
      isRecording ? " text-gray-500 mb-7 text-2xl " : "text-[#2F2A44] font-bold text-3xl"
    }`}
  >
    {isRecording ? "Listening....." : "Ready to Listen"}
  </h1>

  {!isRecording && (
    <p className="mt-2 text-center mb-6 text-gray-500">
      Tap the button below to begin.
    </p>
  )}
</div>


          <button
          className="cursor-pointer transition duration-200 active:scale-95
          "
          onClick={() => {
              if (isRecording) {
                stopRecording();
              } else {
                startRecording();
              }
            }}>
              
   <div
      className="
      w-14
      h-14
      rounded-full
      flex
      items-center
      justify-center
      bg-white
                ">

              <div
              className={`"
                  border-[3px]
                  border-white
                  bg-[#FF453A]
                  transition-all
                  duration-300
                  "  ${isRecording ? "w-8 h-8 rounded-lg":" w-13 h-13 rounded-full"}   ` }>
                
              </div>
            </div>
          </button>




<p
className={`
mt-6
text-lg
font-light
tracking-wide

${isRecording
    ? "text-[#6d6a6aca]"
    : "text-[#928a93c2]"}
`}
      >
   {minutes}:{secs}
</p>

<div className="mt-6 h-10 flex items-center justify-center">
    <Audio
        height="40"
        width="120"
        color="#664079"
        visible={isRecording}
        ariaLabel="recording-wave"
    />
</div>


  </div>
      </main>

    )

}

export default RecordingScreen