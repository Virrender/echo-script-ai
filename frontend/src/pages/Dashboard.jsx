import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

function Dashboard() {
  const [selected, setSelected] = useState(null);
  const [sidebaropen, setSidebaropen] = useState(true);
  const [recordingKey, setRecordingKey] = useState(0);
  const [mainView, setMainView] = useState("viewer");
  const [sidebarRecordings, setSidebarRecordings] = useState([]);
  const [libraryRecordings, setLibraryRecordings] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [mode, setMode] = useState("echo");

  const [sidebarGenerations, setSidebarGenerations] = useState([]);
const [libraryGenerations, setLibraryGenerations] = useState([]);
const [generationTotal, setGenerationTotal] = useState(0);

  const limit = 10;
const recordingTotalPages = Math.ceil(total / limit);
const generationTotalPages = Math.ceil(generationTotal / limit);

  async function loadLibraryRecordings(page, limit, search = "") {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/recordings?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    if (response.ok) {
      setLibraryRecordings(data.items);
      setTotal(data.total);
    } else {
      console.error(data);
    }
  }



  async function loadLibraryGenerations(page, limit, search = "") {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/generation?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    if (response.ok) {
      setLibraryGenerations(data.items);
      setGenerationTotal(data.total);
    } else {
      console.error(data);
    }
  }

    useEffect(() => {
    loadLibraryRecordings(page, limit, debouncedSearch); // this is just new React ESLint rule, we can ignore it
    loadLibraryGenerations(page, limit, debouncedSearch);
  }, [page, debouncedSearch]);



  async function loadSidebarRecordings(page, limit) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/recordings?page=${page}&limit=${limit}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    if (response.ok) {
      setSidebarRecordings(data.items);
    } else {
      console.error(data);
    }
  }

    async function loadSidebarGenerations(page, limit) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/generation?page=${page}&limit=${limit}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    if (response.ok) {
      setSidebarGenerations(data.items);;
    } else {
      console.error(data);
    }
  }

  useEffect(() => {
    loadSidebarRecordings(1, limit); // this is just new React ESLint rule, we can ignore it
    loadSidebarGenerations(1, limit);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // useEffect(() => {
  //   console.log("Searching:", debouncedSearch);
  // }, [debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  async function refreshRecordings() {
    await Promise.all([
      loadSidebarRecordings(1, limit),
      loadSidebarGenerations(1, limit),

      loadLibraryRecordings(page, limit, debouncedSearch),
      loadLibraryGenerations(page, limit, debouncedSearch),
    ]);
  }

  function handleSeeAll() {
    setMainView("library");
  }

  function handleNewRecording() {
    setMainView("recording");
    setRecordingKey((prev) => prev + 1);
    setSelected({
      id: null,
      title: "New Recording",
      isNew: true,
    });
  }

  function handleNewGeneration() {
  setMainView("recording");
  setRecordingKey((prev) => prev + 1);

  setSelected({
    id: null,
    title: "New Generation",
    isNew: true,
  });
}

useEffect(() => {
  setSelected(null);
  setMainView("viewer");
  setSearch("");
  setPage(1);
}, [mode]);

  async function handleSelectRecording(recording) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/recordings/${recording.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (response.ok) {
      setSelected(data);
      setMainView("viewer");
    } else {
      console.error(data);
    }
  }

  async function handleSelectGeneration(generation) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://127.0.0.1:8000/generation/${generation.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    setSelected(data);
    setMainView("viewer");
  } else {
    console.error(data);
  }
}
console.log("Recordings:", sidebarRecordings);
console.log("Generations:", sidebarGenerations);

  return (
    <>
      <div   className={`
    h-screen
    flex
    flex-col
    overflow-hidden
    transition-colors
    duration-300
    ${
      mode === "echo"
        ? "bg-[#F7F3FA]"
        : "bg-[#17151D]"
    }
  `}
>
        <Navbar 
        ontoggleSidebar={() => setSidebaropen((prev) => !prev)}
        mode={mode}
        setMode={setMode}/>

        <div className="flex flex-1 gap-4 min-h-0">
          {sidebaropen && (
            <Sidebar
               mode={mode}
               sidebarRecordings={sidebarRecordings}
                sidebarGenerations={sidebarGenerations}
              onSelectRecording={
                mode === "echo"
                  ? handleSelectRecording
                  : handleSelectGeneration
              }

              onNewGeneration={handleNewGeneration}
            
              selected={selected}
              onSeeAll={handleSeeAll}

              onNewRecording={
                mode === "echo"
                  ? handleNewRecording
                  : handleNewGeneration
              }
            />
          )}

          <MainContent
            key={recordingKey}
            selected={selected}
            mainView={mainView}
            refreshRecordings={refreshRecordings}

            libraryRecordings={libraryRecordings}
            page={page}
            setPage={setPage}
            totalPages={
              mode === "echo"
                ? recordingTotalPages
                : generationTotalPages
            }

            search={search}
            setSearch={setSearch}
            onSelectRecording={handleSelectRecording}

            mode={mode}
            libraryGenerations={libraryGenerations}
            onSelectRecording={handleSelectRecording}
            onSelectGeneration={handleSelectGeneration}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
