import RecordingScreen from "./RecordingScreen";
import RecordingViewer from "./RecordingViewer";


function MainContent({ selected }) {

  if (!selected) {
    return (
      <main className="flex-1 flex items-center justify-center  ">
        <h2>No recording selected</h2>
      </main>
    );
  }

  if (selected?.isNew) {
    return <RecordingScreen />;
  }

  return (
  <>
    <RecordingViewer recording={selected} />;

  </>
  );
  
  };


export default MainContent
