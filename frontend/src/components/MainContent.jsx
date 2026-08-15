import RecordingScreen from "./RecordingScreen";
import RecordingViewer from "./RecordingViewer";
import RecordingLibrary from "./RecordingLibrary";
import GenerationScreen from "./GenerationScreen";
import GenerationLibrary from "./GenerationLibrary";
import GenerationViewer from "./GenerationViewer";
import EmptyState from "./EmptyState";


function MainContent({
  selected,
  refreshRecordings,
  mainView,

  libraryRecordings,
  page,
  setPage,
  totalPages,

  search,
  setSearch,
  mode,
  onSelectRecording,
  libraryGenerations,
  onSelectGeneration,
  onCreate
  

}) {


 
if (mainView === "library") {
  return mode === "echo" ? (
    <RecordingLibrary
      libraryRecordings={libraryRecordings}
      page={page}
      setPage={setPage}
      totalPages={totalPages}
      search={search}
      setSearch={setSearch}
      onSelectRecording={onSelectRecording}
      mode={mode}
    />
  ) : (
    <GenerationLibrary
      libraryGenerations={libraryGenerations}
      page={page}
      setPage={setPage}
      totalPages={totalPages}
      search={search}
      setSearch={setSearch}
      onSelectGeneration={onSelectGeneration}
      mode={mode}
    />
  );
}


if (!selected) {
  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        <div className="mb-5 text-5xl">
          {mode === "echo" ? "🎙️" : "✨"}
        </div>

        <h2
          className={`text-3xl font-semibold tracking-tight ${
            mode === "echo"
              ? "text-[#2F2A44]"
              : "text-[#F5F3FF]"
          }`}
        >
          {mode === "echo"
            ? "Ready to capture your thoughts?"
            : "Ready to bring your words to life?"}
        </h2>

        <p
          className={`mt-3 text-base leading-7 ${
            mode === "echo"
              ? "text-gray-500"
              : "text-[#AAA4B8]"
          }`}
        >
          {mode === "echo"
            ? "Start a recording and Echo Script will turn your voice into an organized transcript."
            : "Create a script and turn it into natural-sounding speech with Kokoro."}
        </p>

        <p
          className={`mt-5 text-sm ${
            mode === "echo"
              ? "text-[#745383]"
              : "text-[#AAA4B8]"
          }`}
        >
          Choose an option from the sidebar to get started.
        </p>

      </div>
    </main>
  );
}


if (selected?.isNew) {
  return mode === "echo" ? (
    <RecordingScreen
      refreshRecordings={refreshRecordings}
    />
  ) : (
    <GenerationScreen
      refreshRecordings={refreshRecordings}
    />
  );
}

return mode === "echo" ? (
        <RecordingViewer 
          recording={selected}
        />
    ) : (
        <GenerationViewer 
          generation={selected}
        />
    );

}

export default MainContent;
