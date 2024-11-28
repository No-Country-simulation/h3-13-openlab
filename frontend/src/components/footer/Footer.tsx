import { Link } from "react-router-dom";
import logo from "../../assets/Openlab_logo2.svg";
import facebook from "../../assets/landing/Facebook.svg";
import instagram from "../../assets/landing/instagram.svg";
import x_logo from "../../assets/landing/X.svg";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-10 mt-5">
      <div className="flex justify-between w-[1400px]">
        <img src={logo} alt="logo" />
        <div className="flex gap-4">
          <Link to={"/"}>
            <img src={facebook} alt="facebook" />
          </Link>
          <Link to={"/"}>
            <img src={instagram} alt="instagram" />
          </Link>
          <Link to={"/"}>
            <img src={x_logo} alt="x" />
          </Link>
        </div>
      </div>
      <div className="flex justify-between w-[1400px]">
        <div className="flex items-center gap-5 text-sm font-medium font-secondary">
          <Link to={"/"}>Visión</Link>
          <Link to={"/"}>Iniciativas</Link>
          <Link to={"/"}>Blog</Link>
          <Link to={"/"}>Entrar</Link>
          <Link to={"/"}>Empezar</Link>
        </div>
        <form onSubmit={() => {}} className="w-[350px] flex flex-col gap-4">
          <p className="text-sm font-semibold">Suscríbete a nuestro Boletín</p>
          <div className="flex justify-between gap-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-6 border rounded-md shadow-md"
            />
            <button className="px-6 py-2 text-lg font-semibold text-white rounded-lg bg-color-1">
              Enviar
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center w-full p-5 border-t">
        <div className="flex justify-between w-[1400px] text-sm">
          <p>Privacy Policy</p>
          <p>© 2024 Openlab SAS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
