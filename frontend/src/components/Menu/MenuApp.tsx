import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  create,
  createW,
  home,
  homeW,
  init,
  log_out,
  newiniW,
  profileB,
  profileW,
} from "../../assets";
import Logo from "../../assets/Openlab_logo2.svg";

const MenuApp = () => {
  const { logout } = useAuth0();
  const [activeLink, setActiveLink] = useState("Home");

  const links = [
    { id: "Home", name: "Home", img: home, imgActive: homeW, path: "/home" },
    {
      id: "Profile",
      name: "Dashboard",
      img: profileB,
      imgActive: profileW,
      path: "/profile",
    },
    {
      id: "New Orders",
      name: "New Orders",
      img: create,
      imgActive: createW,
      path: "/orders",
    },
    {
      id: "init",
      name: "Initiatives",
      img: init,
      imgActive: newiniW,
      path: "/initiatives",
    },
  ];

  const handleOut = () => {
    logout();
    localStorage.removeItem("userInfo"); // Limpiar localStorage al cerrar sesión
    toast.success("Logout successful");
  };

  return (
    <div className="flex flex-col items-center h-screen gap-4">
      <div className="m-4 p-9">
        <img src={Logo} className="text-black w-[115px] h-[29.4px]" />
      </div>

      <div className="flex flex-col items-center hidden space-y-4 lg:block">
        {links.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            onClick={() => setActiveLink(link.id)}
            className={`flex items-center text-sm font-semibold p-3 w-[197px] rounded-xl hover:bg-[#E0E0E0] ${
              activeLink === link.id
                ? "bg-gradient-to-br from-blue-700 to-sky-400 text-white"
                : " text-black"
            }`}
          >
            <img
              src={activeLink === link.id ? link.imgActive : link.img}
              className="m-1 mr-4 w-[2em]"
              alt={link.name}
            />
            {link.name}
          </Link>
        ))}
      </div>

      <div className="contents">
        <button
          className="flex self-start items-center justify text-sm p-3 w-[197px] font-semibold hover:bg-[#E0E0E0] mt-auto ml-8 rounded "
          onClick={handleOut}
        >
          <img
            src={log_out}
            className="m-1 mr-4 h-[22px] w-[22px]"
            alt="Log out"
          />
          Log out
        </button>
        <br />
      </div>
    </div>
  );
};

export default MenuApp;
