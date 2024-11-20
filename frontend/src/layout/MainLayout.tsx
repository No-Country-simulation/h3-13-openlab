import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.tsx";
import Footer from "../components/footer/Footer.tsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
