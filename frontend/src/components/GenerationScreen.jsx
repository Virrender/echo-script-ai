
import { useState } from "react";
import GenerationViewer from "./GenerationViewer";
import {  ThreeDots } from "react-loader-spinner";

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

if (isGenerating) {
  return (
    <main   className="
    flex-1
    overflow-y-auto
    px-8
    py-10
  ">
      <div
    className="
      mx-auto
      flex
      min-h-full
      max-w-2xl
      items-center
      justify-center
    "
  >

      <div
        className="
          flex
          flex-col
          items-center
          rounded-3xl
          bg-[#211D29]
          px-14
          py-12
          shadow-lg
        "
      >
        <h1 className="mt-4 text-3xl font-bold text-[#F5F3FF]">
          Generating voice...
        </h1>

        <p className="mt-5 text-center text-sm text-[#AAA4B8]">
          Turning your script into natural speech.
        </p>

        <ThreeDots
          visible
          height="70"
          width="70"
          color="#B58AD6"
        />

        <p className="mt-5 text-sm text-[#8F889F]">
          This usually takes a few seconds.
        </p>
         </div>
      </div>
    </main>
  );
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
  <main className="flex flex-1 flex-col items-center justify-center">
    <div
      className="
        w-full
        max-w-md
        bg-[#211D29]
        rounded-3xl
        shadow-lg
        px-10
        py-10
      "
    >
      <h1
        className="
          text-center
          text-3xl
          font-bold
          text-[#F5F3FF]
        "
      >
        Script Echo
      </h1>

      <p
        className="
          mt-2
          mb-7
          text-center
          text-[#AAA4B8]
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
          mb-4
          w-full
          rounded-xl
          border
        border-[#3A3347]
        bg-[#17151D]
        text-[#F5F3FF]
        placeholder:text-[#8F889F]
          px-4
          py-3
          outline-none
          transition
          focus:border-[#745383]
        "
      />

      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Write your script..."
        className="
          h-40
          w-full
          resize-none
          rounded-2xl
          border
        border-[#3A3347]
        bg-[#17151D]
        text-[#F5F3FF]
        placeholder:text-[#8F889F]
          p-4
          outline-none
          transition
          focus:border-[#745383]
        "
      />

      <button
        onClick={generateVoice}
        className="
          mt-6
          w-full
          rounded-xl
          py-3
          font-medium
          transition
          bg-[#B58AD6]
        text-[#17151D]
        hover:bg-[#C9A3E5]
          active:scale-[0.98]
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
