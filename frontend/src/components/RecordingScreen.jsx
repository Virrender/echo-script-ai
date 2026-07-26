
import { useRef } from "react";
import { useState } from "react";
import { Audio } from "react-loader-spinner";

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
        <div className="flex flex-1  flex-col items-center justify-center p-2">
          <p>Uploading...</p>
        </div>
      );
    }


if (isCompleted) {
      return (
        <div className="flex flex-1  flex-col items-center justify-center">
          {transcript && (
            <div>
              <p
                className={
                  isRecording ? "text-red-400 text-xl font-bold" : "text-xl"
                }
              >
                {minutes}:{secs}
              </p>

              <h3 className="font-bold mt-2 mb-1">Transcript</h3>
              <p>{transcript}</p>
            </div>
          )}
        </div>
      );
    };



    return(

<main className="flex flex-1  flex-col items-center justify-center">

  <div  className="
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