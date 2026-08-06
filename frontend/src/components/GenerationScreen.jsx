
import { useState } from "react";
import GenerationViewer from "./GenerationViewer";
// import {  ThreeDots } from "react-loader-spinner";

// import { formatRecordingDate } from "../utils/formatDate";

function GenerationScreen({ refreshRecordings }) {
    const [title, setTitle] = useState("");
    const [script, setScript] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [completedGeneration, setCompletedGeneration] = useState(null);
    
async function generateVoice() {

  if (!title.trim() || !script.trim()) {
    alert("Please enter a title and script.");
    return;
  }

  setIsGenerating(true);

  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://127.0.0.1:8000/generation/upload",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        script,
      }),
    }
  );

  const data = await response.json();

  setIsGenerating(false);

  if (response.ok) {

    setCompletedGeneration(data);

    await refreshRecordings();

    setIsCompleted(true);

  } else {
    alert(data.detail);
  }
}

if (isCompleted && completedGeneration) {
    return (
        <GenerationViewer
            generation={completedGeneration}
        />
    );
}

//   const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
//   const secs = String(seconds % 60).padStart(2, "0");

  return (
    <main className="flex flex-1 items-center justify-center">
      <div
        className="
          w-full
          max-w-2xl
          bg-stone-100
          rounded-3xl
          shadow-lg
          p-10
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-[#3B3554]
            text-center
          "
        >
          Script Echo
        </h1>

        <p
          className="
            mt-3
            text-center
            text-gray-500
          "
        >
          Turn your script into natural speech.
        </p>

        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title..."
          className="
            mt-8
            w-full
            rounded-xl
            border
            border-gray-200
            p-3
            outline-none
          "
        />

        <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
          placeholder="Write something..."
          className="
            mt-4
            h-56
            w-full
            resize-none
            rounded-2xl
            border
            border-gray-200
            p-4
            outline-none
          "
        />

        <button
        onClick={generateVoice}
          className="
            mt-6
            w-full
            rounded-xl
            bg-[#5A486E]
            py-3
            font-medium
            text-white
            transition
            hover:bg-[#4A395E]
            cursor-pointer
          "
        >
          Generate Voice
        </button>
      </div>
    </main>
  );
}
export default GenerationScreen;
