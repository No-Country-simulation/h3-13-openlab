import { Outlet } from "react-router-dom";
import NavbarApp from "../components/navbar/NavbarApp";
import MenuApp from "../components/Menu/MenuApp";
import Modal from "../components/createInit/modalCreate";
import { useDarkMode } from "../components/hooks/DarkMode";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const { toggleDarkMode } = useDarkMode();
  const isDarkMode = useSelector ((state: any) => state.darkMode.isDarkMode);

    return (
      <div className="flex h-screen" style={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',}} >
        <aside className="w-64 h-full flex-shrink-0 hidden lg:block">
        <MenuApp toggleDarkMode={toggleDarkMode}/>
        </aside>
  
        <div className="flex-1 flex flex-col">
          <header >
            <NavbarApp toggleDarkMode={toggleDarkMode} />
          </header>
  
          <main className="flex-1 overflow-y-auto">
            <Outlet />
            <Modal/>
          </main>
        </div>
      </div>
    );
  };

export default AppLayout;
