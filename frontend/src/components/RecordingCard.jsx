function RecordingCard({ recording, onClick, isSelected }) {
  return (
    <>
      <div>
        <button
          className={`w-full p-3 rounded text-left cursor-pointer  ${isSelected ? "bg-gray-100" : ""}`}
          onClick={onClick}
        >
          {recording.transcript.slice(0, 20)}
        </button>
      </div>
    </>
  );
}

export default RecordingCard;
