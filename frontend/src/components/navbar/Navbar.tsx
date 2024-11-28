import { Link } from "react-router-dom";
import LoginButton from "../login/LoginButton";
import logo from "../../assets/Openlab_logo.svg";
import flag from "../../assets/landing/US_Flag.svg";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-center border-b bg-primary">
        <div className="flex justify-between p-3 text-white w-[1500px]">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          <div className="flex items-center gap-5 text-sm font-semibold font-secondary">
            <Link to={"/"}>Visión</Link>
            <Link to={"/initiatives"}>Iniciativas</Link>
            <Link to={"/"}>Blog</Link>
            <Link to={"/test"}>Entrar</Link>
            <Link to={"/"}>Empezar</Link>
            <LoginButton />
            <div className="flex items-center h-full gap-2 px-3 border-l border-r">
              <img src={flag} alt="" />
              <p>EN</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
