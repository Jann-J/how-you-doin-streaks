import { FaUser } from "react-icons/fa";
function NavBar() {

  return (
    <nav className="relative overflow-hidden bg-gradient-to-b from-blue-700 via-blue-600 via-90% to-blue-400 h-16 md:h-16">
      
      {/* Nav content */}
      <div className="relative z-10 flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 text-white">
        {/* Empty div for balance */}
        <div className="w-10"></div>
        
        {/* Centered title */}
        <div className="text-3xl roboto font-bold absolute left-1/2 transform -translate-x-1/2">
          How you doin' streaks
        </div>


        <div className="flex items-center space-x-4 md:space-x-6">
          {/* view profile icon aa the right longly after login*/}
          <button className="p-2.5 rounded-full bg-black hover:bg-zinc-700 transition" title="Profile">
                <FaUser className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;