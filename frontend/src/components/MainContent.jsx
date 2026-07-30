import RecordingScreen from "./RecordingScreen";
import RecordingViewer from "./RecordingViewer";
import RecordingLibrary from "./RecordingLibrary";

function MainContent({ 
  selected, refreshRecording, 
    mainView,
 }) {
  
  if (mainView === "library"){
    return <RecordingLibrary
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
    return <RecordingScreen refreshRecording={refreshRecording} />;
  }

  return (
    <>
      <RecordingViewer recording={selected} />
    </>
  );
}

export default MainContent;
