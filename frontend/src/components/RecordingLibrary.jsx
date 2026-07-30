
import RecordingCard from "./RecordingCard"
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";

function RecordingLibrary()
{

const [total, setTotal] = useState(0); 
const [libraryRecordings, setLibraryRecordings] = useState([]);
  const [page, setPage] = useState(1);
 let limit = 10;

const totalPages = Math.ceil(total / limit);
// const arr=Array.from({length:totalPages}).map((_,index)=>index+1)

const currentPage = page;

let leftPage = currentPage - 1;
let rightPage = currentPage + 1;

if (leftPage < 1) {
  leftPage = 1;
}

if (rightPage > totalPages) {
  rightPage = totalPages;
}


async function loadLibraryRecordings(page,limit) {
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
      setLibraryRecordings(data.items);
      setTotal(data.total)
    } else {
      console.error(data);
    }
  }




  useEffect(() => {
    loadLibraryRecordings(page,limit); // this is just new React ESLint rule, we can ignore it
  },[page]);

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


    return (<>

    


 <div className="flex-1  min-h-0  overflow-y-auto space-y-2 border-y border-gray-300">
          {libraryRecordings.map((recording) => (
            <RecordingCard
              key={recording.id}
              recording={recording}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">

  {/* Previous */}
  <button
    onClick={() => {
      if (currentPage > 1) {
        setPage(currentPage - 1);
      }
    }}
  >
    ◀
  </button>

  {/* First Page */}
  <button
    onClick={() => setPage(1)}
  >
    1
  </button>

  {/* Left dots */}
  {currentPage > 3 && (
    <span>...</span>
  )}

  {/* Left Page */}
  {currentPage > 2 && (
    <button
      onClick={() => setPage(leftPage)}
    >
      {leftPage}
    </button>
  )}

  {/* Current Page */}
  {currentPage !== 1 && currentPage !== totalPages && (
    <button className="font-bold text-purple-700">
      {currentPage}
    </button>
  )}

  {/* Right Page */}
  {currentPage < totalPages - 1 && (
    <button
      onClick={() => setPage(rightPage)}
    >
      {rightPage}
    </button>
  )}

  {/* Right dots */}
  {currentPage < totalPages - 2 && (
    <span>...</span>
  )}

  {/* Last Page */}
  {totalPages > 1 && (
    <button
      onClick={() => setPage(totalPages)}
    >
      {totalPages}
    </button>
  )}

  {/* Next */}
  <button
    onClick={() => {
      if (currentPage < totalPages) {
        setPage(currentPage + 1);
      }
    }}
  >
    ▶
  </button>

</div>


    
    </>)
}

export default RecordingLibrary