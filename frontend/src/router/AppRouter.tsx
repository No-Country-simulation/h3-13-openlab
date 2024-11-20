import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Error404 from "../layout/Error404.tsx";
import MainLayout from "../layout/MainLayout.tsx";
import Home from "../pages/home/Home.tsx";

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<Error404 />}>
      <Route index element={<Home />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);
