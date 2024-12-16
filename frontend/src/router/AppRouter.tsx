import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "../layout/AppLayout.tsx";
import Error404 from "../layout/Error404.tsx";
import Landing from "../pages/home/Landing.tsx";
import Login from "../pages/login/Login.tsx";
import CreateOrdersPage from "../pages/User/CreateOrdersPage.tsx";
import Detail from "../pages/User/DetailInitiative.tsx";
import HomeUser from "../pages/User/Home.tsx";
import Initiativas from "../pages/User/Initiativas.tsx";
import Profile from "../pages/User/Profile.tsx";
import ProtectedRoute from "./ProtectRoutes.tsx";

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Rutas publicas */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error404 />} />
      {/* Rutas User */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route path="home" element={<HomeUser />} />
          <Route path="initiatives" element={<Initiativas />} />
          <Route path="orders" element={<CreateOrdersPage />} />
          <Route path="initiative/:id" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </>
  )
);
