import { Outlet, Route, Routes } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import NotFound from "../pages/starter/NotFound";
import Home from "../pages/home/Home";

export type IpaRoute = {
  path: string;
  name: string;
};

export const NAVBAR_LINKS: Array<IpaRoute> = [{ path: "/", name: "Home" }];

function PageWithNavigationBar() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

function NavigationRoutes() {
  return (
    <Routes>
      <Route element={<PageWithNavigationBar />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default NavigationRoutes;
