import RecordingScreen from "./RecordingScreen";
import RecordingViewer from "./RecordingViewer";
import RecordingLibrary from "./RecordingLibrary";
import GenerationScreen from "./GenerationScreen";
import GenerationLibrary from "./GenerationLibrary";
import GenerationViewer from "./GenerationViewer";

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
      <main className="flex-1 flex items-center justify-center  ">
        <h2>No recording selected</h2>
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
