import { Outlet, Route, Routes } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import NotFound from "../pages/starter/NotFound";
import Home from "../pages/home/Home";

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default NavigationRoutes;
