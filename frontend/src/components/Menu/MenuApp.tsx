import { useState } from "react";
import { newini, home, init, log_out, newiniW, homeW, initW } from "../../assets";
import Logo from "../../assets/Group.svg";
import { Link, useNavigate } from "react-router-dom"; 
import { logout } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const MenuApp = () => {
  const [activeLink, setActiveLink] = useState("home"); 
  const dispatch =useDispatch()
  const navigate =useNavigate()

  const links = [
    { id: "Home", name: "Home", img: home, imgActive: homeW, path: "/test" },
    { id: "My Initiatives", name: "My Initiatives", img: newini, imgActive: newiniW, path: "/MyInitiatives" },
    // { id: "newini", name: "New Initiatives", img: newini, imgActive: newiniW, path: "" },
    { id: "init", name: "Initiatives", img: init, imgActive: initW, path: "/initiatives" },
  ];

  function handleOut(){
    dispatch(logout())
    toast.success("Logout successful")
    navigate("/")
  }

  return (
    <div className="flex flex-col items-center gap-4 h-screen">
      <div className="p-9 m-4">
        <img src={Logo} className="text-black w-[115px] h-[29.4px]" />
      </div>

      <div className="hidden lg:block flex flex-col items-center space-y-4">
        {links.map((link) => (
          <Link
            key={link.id}
            to={link.path} 
            onClick={() => setActiveLink(link.id)} 
            className={`flex items-center text-sm font-semibold p-3 w-[197px] rounded hover:bg-[#E0E0E0] ${
              activeLink === link.id
                ? "bg-gradient-to-br from-blue-700 to-sky-400 text-white"
                : " text-black"
            }`}
          >
            <img
              src={activeLink === link.id ? link.imgActive : link.img}
              className="m-1 mr-4"
              alt={link.name}
            />
            {link.name}
          </Link>
        ))}
      </div>

      <div className="contents" >
        <button
          className="flex self-start items-center justify text-sm p-3 w-[197px] font-semibold hover:bg-[#E0E0E0] mt-auto ml-8 rounded "
          onClick={handleOut}
        >
          <img src={log_out} className="m-1 mr-4 h-[22px] w-[22px]" alt="Log out" />
          Log out
        </button>
        <br/>
      </div>
    </div>
  );
};

export default MenuApp;
