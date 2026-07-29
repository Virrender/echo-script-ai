import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

function Dashboard() {
  const [selected, setSelected] = useState(null);
  const [sidebaropen, setSidebaropen] = useState(true);
  const [recordings, setRecordings] = useState([]);
  const [recordingKey, setRecordingKey] = useState(0);
  const [mainView, setMainView] = useState("viewer");





  async function loadRecordings() {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://127.0.0.1:8000/recordings",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    if (response.ok) {
      setRecordings(data);
    } else {
      console.error(data);
    }
  }

  useEffect(() => {
    loadRecordings(); // this is just new React ESLint rule, we can ignore it
  }, []);

function handleSeeAll(){
  setMainView("library")
}

function handleNewRecording(){
    setMainView("recording");
    setRecordingKey((prev)=> prev+1)
    setSelected({
        id: null,
        title: "New Recording",
        isNew: true,
    })
}

function handleSelectRecording(recording){
  setMainView("viewer");
  setSelected(recording);
}


  console.log(mainView);
  return (
    <>
      <div className="h-screen bg-[#F4F0FF] flex flex-col overflow-hidden">
        <Navbar ontoggleSidebar={() => setSidebaropen((prev) => !prev)} />

        <div className="flex flex-1 gap-4 min-h-0">
          {sidebaropen && (
            <Sidebar 
              recordings={recordings}
              setSelected={setSelected}
              sidebaropen={setSidebaropen}
              setMainView={setMainView}
              selected={selected}
              
              onSeeAll={handleSeeAll}
              onNewRecording={handleNewRecording}
              onSelectRecording={handleSelectRecording}
          
    
            />
          )}

          <MainContent
            key={recordingKey}
            selected={selected}
            refreshRecording={loadRecordings}
            recordings={recordings}
            mainView={mainView}

          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
