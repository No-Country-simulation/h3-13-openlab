import { Outlet } from "react-router-dom";
import MenuApp from "../components/Menu/MenuApp";
import NavbarApp from "../components/navbar/NavbarApp";

const AppLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="flex-shrink-0 hidden w-64 h-full lg:block">
        <MenuApp />
      </aside>
      <div className="flex flex-col flex-1">
        <header>
          <NavbarApp />
        </header>
        <main className="flex-1 overflow-y-auto scrollbar-webkit">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
