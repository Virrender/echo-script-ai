
import RecordingCard from "./RecordingCard"
import Pagination from "@mui/material/Pagination";

function RecordingLibrary(
{  libraryRecordings,
  page,
  setPage,
  totalPages,
  search,
  setSearch,
  onSelectRecording,}
)
{



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

<div
  className="
    w-full
    max-w-sm
    mx-auto
    mt-5
    mb-5
  "
>
  <input
    type="text"
    placeholder="Search recordings..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      rounded-full
      border
      border-gray-200
      bg-white
      px-4
      py-2.5
      text-sm
      text-gray-700
      placeholder:text-gray-400
      shadow-sm
      outline-none
      transition
      focus:border-[#745383]
      focus:ring-2
      focus:ring-[#745383]/20
    "
  />
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
              onClick={() => onSelectRecording(recording)}
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