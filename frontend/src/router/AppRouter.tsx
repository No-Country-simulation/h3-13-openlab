import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Error404 from "../layout/Error404.tsx";
import MainLayout from "../layout/MainLayout.tsx";
import Home from "../pages/home/Home.tsx";
import Initiativas from "../pages/User/Initiativas.tsx";
import Profile from "../pages/User/Profile.tsx";
import AppLayout from "../layout/AppLayout.tsx";
import HomeUser from "../pages/User/Home.tsx";
// import ProtectedRoute from "./ProtectRoutes.tsx";

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
    {/* Rutas publicas */}
      <Route path="/" element={<MainLayout />} errorElement={<Error404 />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    {/* Rutas User */}
      {/* <Route element={<ProtectedRoute allowedRoles={["user"]}/>}> */}
      <Route path="/" element={<AppLayout/>}>
        <Route path="test" element={<HomeUser />} />
        <Route path="initiatives" element={<Initiativas />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </>
  )
);