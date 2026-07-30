import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";



function Dashboard() {
  const [selected, setSelected] = useState(null);
  const [sidebaropen, setSidebaropen] = useState(true);
  // const [recordings, setRecordings] = useState([]);
  const [recordingKey, setRecordingKey] = useState(0);
  const [mainView, setMainView] = useState("viewer");
  // const [total, setTotal] = useState(0);


  // const [libraryRecordings, setLibraryRecordings] = useState([]);






// const totalPages = Math.ceil(total / limit);
// const arr=Array.from({length:totalPages}).map((_,index)=>index+1)




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

// function handleNext(){
//   setPage((prev)=>prev+1)
// }

// function handlePrevious(){
//   setPage((prev)=>prev-1)
// }

// // function handlelast(){
// //   setPage(totalPages)
// // }

// function handlefirst(){
//   setPage(1)
// }




  console.log(mainView);

  return (
    <>
      <div className="h-screen bg-[#F4F0FF] flex flex-col overflow-hidden">
        <Navbar ontoggleSidebar={() => setSidebaropen((prev) => !prev)} />

        <div className="flex flex-1 gap-4 min-h-0">
          {sidebaropen && (
            <Sidebar 
              // recordings={recordings}
              setSelected={setSelected}
              sidebaropen={setSidebaropen}
              setMainView={setMainView}
              selected={selected}
  
              onSeeAll={handleSeeAll}
              onNewRecording={handleNewRecording}
              onSelectRecording={handleSelectRecording}
              // loadRecordings={loadRecordings}
              // page={page}
              // limit={limit}
              // setPage={setPage}



          
    
            />
          )}

          <MainContent
            key={recordingKey}
            selected={selected}
            // refreshRecording={loadRecordings}
            // recordings={recordings}
            mainView={mainView}

              // onNext={handleNext}
              // onPrevious={handlePrevious}
              // // onLast={handlelast}
              // onFirst={handlefirst}
              // // arr={arr}
              // setPage={setPage}

              

          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
