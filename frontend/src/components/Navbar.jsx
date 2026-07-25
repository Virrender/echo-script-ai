import { Logs } from "lucide-react";

function Navbar({ ontoggleSidebar }) {
  return (
    <nav className="
            h-16
            bg-white
            border-b
            border-gray-200
            shadow-sm
            px-6
            flex
            items-center
            justify-between
            ">
      <div className="flex items-center gap-3">
        <div>
          <button onClick={ontoggleSidebar}
          className="
        
        rounded-lg
        p-2
        duration-200
        transition
        hover:bg-gray-100
        active:scale-95
        cursor-pointer

        ">
    <Logs size={22} strokeWidth={2} />
          </button>

        </div>

        <div className="
            text-xl
            font-semibold
            tracking-tight
            text-[#4d2d4d]
            select-none
            ">
          <h2>Echo Script</h2>
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
            User Profile</button>
        
      </div>
    </nav>
  );
}
export default Navbar;
