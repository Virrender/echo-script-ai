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

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

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

  useEffect(() => {
    loadLibraryRecordings(page, limit, debouncedSearch); // this is just new React ESLint rule, we can ignore it
  }, [page, debouncedSearch]);

  async function loadSidebarRecordings(page, limit) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      ` http://127.0.0.1:8000/recordings?page=${page}&limit=${limit}`,

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

  useEffect(() => {
    loadSidebarRecordings(1, limit); // this is just new React ESLint rule, we can ignore it
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

      loadLibraryRecordings(page, limit),
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

  return (
    <>
      <div className="h-screen bg-[#F4F0FF] flex flex-col overflow-hidden">
        <Navbar ontoggleSidebar={() => setSidebaropen((prev) => !prev)} />

        <div className="flex flex-1 gap-4 min-h-0">
          {sidebaropen && (
            <Sidebar
              sidebarRecordings={sidebarRecordings}

              selected={selected}

              onSeeAll={handleSeeAll}
              onNewRecording={handleNewRecording}
              onSelectRecording={handleSelectRecording}
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
            totalPages={totalPages}

            search={search}
            setSearch={setSearch}
            onSelectRecording={handleSelectRecording}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
