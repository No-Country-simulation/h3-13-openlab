import { useAuth0 } from "@auth0/auth0-react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  home,
  init,
  line,
  log_out,
  newini,
  off,
  on,
  profile,
  profileB,
} from "../../assets";
import { selectCurrentUser } from "../../store/auth/authSlice";

const NavbarApp: React.FC = () => {
  const { logout } = useAuth0();
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectCurrentUser);

  const handleOut = () => {
    logout();
    localStorage.removeItem("userInfo"); // Limpiar localStorage al cerrar sesión
    toast.success("Logout successful");
  };

  return (
    <div className="bg-white flex items-center justify-between p-4 shadow-sm h-[72px]">
      <div className="flex-1">
        <div className="flex items-center sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-0 left-0 z-50 w-full h-full bg-white shadow-lg sm:hidden">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsMenuOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center min-h-screen space-y-4">
              <Link
                to="/home"
                className="flex items-center p-2 text-lg font-semibold rounded hover:bg-gradient-to-br from-blue-700 to-sky-400 hover:text-white"
              >
                <img src={home} className="m-1" />
                Home
              </Link>
              <Link
                to="/profile"
                className="flex items-center p-2 text-lg font-semibold rounded hover:bg-gradient-to-br from-blue-700 to-sky-400 hover:text-white"
              >
                <img src={profileB} className="m-1" />
                Dashboard
              </Link>
              <Link
                to="/orders"
                className="flex items-center p-2 text-lg font-semibold rounded hover:bg-gradient-to-br from-blue-700 to-sky-400 hover:text-white"
              >
                <img src={newini} className="m-1" />
                New Orders
              </Link>
              <Link
                to="/initiatives"
                className="flex items-center p-2 text-lg font-semibold rounded hover:bg-gradient-to-br from-blue-700 to-sky-400 hover:text-white"
              >
                <img src={init} className="m-1" />
                Initiatives
              </Link>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />

              <button
                className="flex items-end p-2 mt-auto text-lg font-semibold rounded hover:bg-gradient-to-br from-blue-700 to-sky-400 hover:text-white"
                onClick={handleOut}
              >
                <img src={log_out} className="m-1 h-[25px] w-[25px]" />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end m-4 space-x-4">
        <div className="mr-[2.5em] lg:mr-0">
          <button onClick={() => open()}>
            <img src={isConnected ? on : off} alt="wallet" />
          </button>
        </div>

        <div>
          <img src={line} alt="Line" />
        </div>

        <Link to="/profile" className="flex flex-row gap-2">
          <div>
            <img
              src={profile}
              alt="profile"
              className="w-[30px] h-[30px] rounded-full"
            />
          </div>
          <p className="p-1 text-sm font-semibold text-black">
            {user?.nombreCompleto}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NavbarApp;
