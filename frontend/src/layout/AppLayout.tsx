import { Outlet } from "react-router-dom";
import NavbarApp from "../components/navbar/NavbarApp";
import MenuApp from "../components/Menu/MenuApp";

const AppLayout = () => {
    return (
      <div className="flex h-screen">
        <aside className="w-64 h-full flex-shrink-0 hidden lg:block">
        <MenuApp/>
        </aside>
  
        <div className="flex-1 flex flex-col">
          <header>
            <NavbarApp />
          </header>
  
          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };

export default AppLayout;
