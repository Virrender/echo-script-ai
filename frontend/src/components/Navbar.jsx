import { Logs, ScrollText , Speech } from "lucide-react";

function Navbar({ 
  ontoggleSidebar,
  mode,
  setMode,
 }) {
  return (
    <nav
  className={`
    h-14
    border-b
    border-gray-200
    px-6
    flex
    items-center
    justify-between
    transition-colors
    duration-300
    ${
      mode === "echo"
        ? "bg-white"
        : "bg-[#c9a5d2]"
    }
  `}
>
      <div className="flex items-center gap-3">
        <div>
          <button
            onClick={ontoggleSidebar}
            className="
        
              rounded-lg
              p-2
              duration-200
              transition
              hover:bg-gray-100
              active:scale-95
              cursor-pointer

              "
          >
            <Logs size={22} strokeWidth={2} />
          </button>
        </div>

        <div
          className={`
            text-xl
            font-semibold
            tracking-tight
            ${
              mode === "echo"
                ? "text-[#4d2d4d]"
                : "text-[#56545e]"
            }
            select-none
          `}
        >
          <button 
          onClick={() =>
                setMode((prev) =>
                    prev === "echo" ? "script" : "echo"
                )
            }
          
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            active:scale-[0.98]
            cursor-pointer"
            >
            


            {mode === "echo"
            ? "Echo Script "
            : "Script Echo" }

           {mode === "echo"
              ? <ScrollText size={20}/>
              : <Speech size={20}/>}
                    
          </button>
          
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="
                flex
                items-center
                gap-2
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                text-gray-600
                transition
                hover:bg-gray-100
                hover:text-[#2F2A44]
                cursor-pointer
              "
        >
          User Profile
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
