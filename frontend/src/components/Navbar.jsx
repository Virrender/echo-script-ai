
import { Logs } from 'lucide-react';

function Navbar({ontoggleSidebar}){
    return (
        <nav className="flex items-center p-4 justify-between rounded mx-1 border-b  border-white ">
            
            <div className="flex items-center gap-3">
                <div>
                <button onClick={ontoggleSidebar}>
                <Logs size={22} strokeWidth={2} />
                </button>
                </div>

                <div>
                    <h2>Echo Script</h2>
                </div>

            </div>
            

            <div className="flex items-center gap-3">

        
                <h2>Login</h2>
        
                <h2>Signup</h2>
            
        
            </div>

        </nav>
    );
}
export default Navbar;