import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";



function Dashboard() {
  const [selected, setSelected] = useState(null);
  const [sidebaropen, setSidebaropen] = useState(true);
  const [recordings, setRecordings]=useState([])
  const [recordingKey, setRecordingKey] = useState(0);

  useEffect(() =>{
    async function loadRecordings() {

      const token = localStorage.getItem("token");

      const response = await fetch (
        "http://127.0.0.1:8000/recordings",

      {       
       headers:{
            Authorization:`Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if(response.ok){
      setRecordings(data);

    }else{
      console.error(data);
    }
};

loadRecordings();

  },[]);

  return (
    <>
      <div className=" h-screen flex flex-col">
        <Navbar ontoggleSidebar={() => setSidebaropen((prev) => !prev)} />

        <div className="flex flex-1 gap-4">
          {sidebaropen && (
            <Sidebar
              recordings={recordings}
              setSelected={setSelected}
              sidebaropen={setSidebaropen}
              selected={selected}

              onNewRecording={() => {
                setRecordingKey((prev) => prev + 1);
                setSelected({
                  id: null,
                  title: "New Recording",
                  isNew: true,
                });
              }}
            />
          )}

          <MainContent key={recordingKey} selected={selected} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
