import { Mic, Volume2, ArrowRight } from "lucide-react";

function EmptyState({ mode, onCreate }) {
  const isEcho = mode === "echo";

  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-xl text-center">

        {/* Icon */}
        <div
          className="
            mx-auto
            mb-6
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[#F4F0FF]
            text-[#745383]
          "
        >
          {isEcho ? (
            <Mic size={26} strokeWidth={1.8} />
          ) : (
            <Volume2 size={26} strokeWidth={1.8} />
          )}
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-[#2F2A44]">
          {isEcho
            ? "Ready to capture your voice?"
            : "Ready to bring your words to life?"}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-500">
          {isEcho
            ? "Record something and Echo Script will turn your voice into a timestamped transcript."
            : "Write a script and Echo Script will turn your words into natural-sounding audio."}
        </p>

        {/* Action */}
        <button
          onClick={onCreate}
          className="
            mt-7
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-[#745383]
            px-6
            py-3
            font-medium
            text-white
            shadow-sm
            transition
            hover:bg-[#644570]
            active:scale-[0.98]
            cursor-pointer
          "
        >
          {isEcho ? "Start recording" : "Create generation"}
          <ArrowRight size={17} />
        </button>

      </div>
    </main>
  );
}

export default EmptyState;