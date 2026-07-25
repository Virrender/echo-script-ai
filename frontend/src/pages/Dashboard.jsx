import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const recordings = [
  {
    id: 1,
    title: "Team Meeting - Project Update",
  },
  {
    id: 2,
    title: "Client Interview - Product Feedback",
  },
  {
    id: 3,
    title: "Daily Standup - Development Progress",
  },
  {
    id: 4,
    title: "Brainstorming Session - New Features",
  },
  {
    id: 5,
    title: "User Research Discussion",
  },
  {
    id: 6,
    title: "Marketing Strategy Meeting",
  },
  {
    id: 7,
    title: "Technical Design Review",
  },
  {
    id: 8,
    title: "Customer Support Call",
  },
  {
    id: 9,
    title: "Sprint Planning Meeting",
  },
  {
    id: 10,
    title: "Project Retrospective",
  },
];

function Dashboard() {
  const [selected, setSelected] = useState(null);
  const [sidebaropen, setSidebaropen] = useState(true);
  const [recordingKey, setRecordingKey] = useState(0);

  // useEffect(() =>{
  //   fetch("http://127.0.0.1:8000/recordings")
  //       .then(response => response.json())
  //       .then(data =>{
  //         setRecordings(data);
  //       })
  // },[]);

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
