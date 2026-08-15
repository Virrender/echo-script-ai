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
          : "bg-[#211D29]"
      }
  `}
>
      <div className="flex items-center gap-3">
        <div>
          <button
            onClick={ontoggleSidebar}
            className={`
            rounded-lg
            p-2
            duration-200
            transition
            ${
            mode === "echo"
            ? "hover:bg-gray-100"
            : "hover:bg-[#302A3A]"
            }
            active:scale-95
            cursor-pointer
            `}
          >
            <Logs size={22} strokeWidth={2}
              className={
    mode === "echo"
      ? "text-[#2F2A44]"
      : "text-[#F5F3FF]"
  }  
  />
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
              : "text-[#F5F3FF]"
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
          👤
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
