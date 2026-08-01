import RecordingScreen from "./RecordingScreen";
import RecordingViewer from "./RecordingViewer";
import RecordingLibrary from "./RecordingLibrary";

function MainContent({ 
    selected,
    refreshRecordings,
    mainView,

    libraryRecordings,
    page,
    setPage,
    totalPages
 }) {
  
  if (mainView === "library"){
    return <RecordingLibrary
            libraryRecordings={libraryRecordings}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
    />

  }

  if (!selected) {
    return (
      <main className="flex-1 flex items-center justify-center  ">
        <h2>No recording selected</h2>
      </main>
    );
  }



  if (selected?.isNew) {
    return <RecordingScreen refreshRecordings={refreshRecordings} />;
  }

  return (
    <>
      <RecordingViewer recording={selected} />
    </>
  );
}

export default MainContent;
