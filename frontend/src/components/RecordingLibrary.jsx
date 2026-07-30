
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



async function loadLibraryRecordings(page,limit) {
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

console.log(libraryRecordings);
    return (

      
   <div className="
    flex
    flex-col
    flex-1
    h-full
    px-8
    py-6
    bg-[#f3e6f4]
  ">
    <div   className="
    flex
    flex-col
    items-center
    justify-center
    text-center
    mb-3
  ">

    <h1
        className="
        text-3xl
        font-bold
        tracking-tight
        text-[#2F2A44]
        "
    >
        All Recordings
    </h1>

    <p
        className="
      mt-3
      max-w-md
      text-base
      leading-7
      text-gray-500
        "
    >
        Browse and manage all your recordings.
    </p>

</div>

    


<div className="
    rounded-3xl
    border
    border-gray-200
    shadow-md
    bg-white
    flex-1
    min-h-0
    mx-20
  ">

 <div className="
      h-full
      overflow-y-auto
      custom-scrollbar

      p-4
      pr-2

      space-y-3
    ">
          {libraryRecordings.map((recording) => (
            <RecordingCard
              key={recording.id}
              recording={recording}
            />
          ))}
        </div>

        </div>
<div
  className="
    flex
    justify-center
    items-center
    mt-4
    mb-1
  "
>
  <Pagination
    count={totalPages}
    page={page}
    onChange={(event, page) => {
      setPage(page);
    }}
  />
</div>
    
    </div>
    )
}

export default RecordingLibrary