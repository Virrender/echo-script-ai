
import { useRef } from "react";
import { useState } from "react";


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
        <div className="p-1">
          <h2 className={isRecording ? "text-red-500 font-bold" : ""}>
            {isRecording ? "Recordingg..." : "New Recording"}
          </h2>
        </div>

        <div className="p">
          <p
            className={
              isRecording ? "text-red-500 text-xl font-bold" : "text-xl"
            }
          >
            {minutes}:{secs}
          </p>

          <button
            className="border mt-3 rounded p-1.5 cursor-pointer "
            onClick={() => {
              if (isRecording) {
                stopRecording();
              } else {
                startRecording();
              }
            }}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>
      </main>

    )

}

export default RecordingScreen