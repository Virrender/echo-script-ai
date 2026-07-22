
import { useState } from 'react';
import './App.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';


const recordings = [
    {
        id: 1,
        title: "Meeting 1"
    },
    {
        id: 2,
        title: "Meeting 2"
    },
    {
        id: 3,
        title: "Meeting 3"
    }
];

function App() {

  const [selected, setSelected]= useState(null);


return (
  <>
  <Navbar />

  <Sidebar 
    recordings={recordings}
    setSelected={setSelected}  
  />

  <MainContent
    selected={selected}

  
  />

  </>
);
}

export default App
