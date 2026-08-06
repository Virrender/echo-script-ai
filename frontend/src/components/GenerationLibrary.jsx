import RecordingCard from "./RecordingCard";
import Pagination from "@mui/material/Pagination";

function GenerationLibrary({
  libraryGenerations,
  page,
  setPage,
  totalPages,
  search,
  setSearch,
  onSelectGeneration,
  mode
}) {
  return (
    <div
      className="
    flex
    flex-col
    flex-1
    h-full
    px-8
    py-6
    bg-[#17151D]
  "
    >
      <div
        className="
    flex
    flex-col
    items-center
    justify-center
    text-center
    mb-3
  "
      >
        <h1
          className="
        text-3xl
        font-bold
        tracking-tight
        text-[#2F2A44]
        "
        >
          All  Generations
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
          Browse and manage all your voice generations.
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
          placeholder="Search generations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
      w-full
      rounded-full
      border
      
    
      px-4
      py-2.5
      text-sm
      bg-[#211D29]
    border-[#3A3347]
    text-[#F5F3FF]
    placeholder:text-[#8F889F]
      
      
      shadow-sm
      outline-none
      transition
      focus:border-[#745383]
      focus:ring-2
      focus:ring-[#745383]/20
    "
        />
      </div>

      <div
        className="
    rounded-3xl
    border
   
    shadow-md
    bg-[#211D29]
    border-[#302A3A]
    flex-1
    min-h-0
    mx-20
  "
      >
        <div
          className="
      h-full
      overflow-y-auto
      custom-scrollbar

      p-4
      pr-2

      space-y-3
    "
        >
          {libraryGenerations.map((generation) => (
            <RecordingCard
                key={generation.id}
                recording={generation}
                displayTitle={generation.title}
                onClick={() => onSelectGeneration(generation)}
                mode={mode}
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
        sx={{
            "& .MuiPaginationItem-root": {
            color: "#E8E1F2",
            borderColor: "#3A3347",
            },
            "& .Mui-selected": {
            backgroundColor: "#745383 !important",
            color: "#fff",
            },
            "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#302A3A",
            },
        }}
        />
      </div>
    </div>
  );
}

export default GenerationLibrary;
