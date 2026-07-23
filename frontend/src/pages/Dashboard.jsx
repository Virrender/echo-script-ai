
import { useState, useEffect } from 'react';

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';


function Dashboard() {  
  const [selected, setSelected]= useState(null);
  const [sidebaropen, setSidebaropen]= useState(true);
  const [recordings, setRecordings] = useState([]);

useEffect(() =>{
  fetch("http://127.0.0.1:8000/recordings")
      .then(response => response.json())
      .then(data =>{
        setRecordings(data);
      })
},[]);




return (
  <>
  <div className="h-screen flex flex-col">

  <Navbar 
  ontoggleSidebar={()=> setSidebaropen(prev => !prev)}
  />

  <div className="flex flex-1 gap-4"> 

  {sidebaropen && (
          <Sidebar 
    recordings={recordings}
    setSelected={setSelected}
    sidebaropen={setSidebaropen} 
    selected={selected} 
  />
  )

  }  

  <MainContent
    selected={selected}

  />
  </div>
  </div>


  </>
);
}

export default Dashboard