import { Link } from "react-router-dom";
import LoginButton from "../login/LoginButton";
import logo from "../../assets/Openlab_logo.svg";
const Navbar = () => {
  return (
    <>
      <nav className="flex justify-center bg-primary">
        <div className="flex justify-between p-3 text-white w-[1500px]">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          <div className="flex items-center gap-5 text-sm font-semibold font-secondary">
            <Link to={"/"}>Visión</Link>
            <Link to={"/"}>Iniciativas</Link>
            <Link to={"/"}>Blog</Link>
            <Link to={"/"}>Entrar</Link>
            <Link to={"/"}>Empezar</Link>
            <LoginButton />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
