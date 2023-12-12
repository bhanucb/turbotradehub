import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import AutoQuoting from "../pages/aq/AutoQuoting";
import Home from "../pages/home/Home";
import Popout from "../pages/popout/Popout";
import LogIn from "../pages/starter/LogIn";
import NotFound from "../pages/starter/NotFound";
import { useIsAuthenticated } from "react-auth-kit";

export type IpaRoute = {
  path: string;
  name: string;
};

export const NAVBAR_LINKS: Array<IpaRoute> = [
  { path: "/", name: "Home" },
  { path: "/aq", name: "Auto Quote" },
];

function PageWithNavigationBar() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

function ProtectedRoutes() {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (isAuthenticated()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

function NavigationRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<PageWithNavigationBar />}>
          <Route path="/aq" element={<AutoQuoting />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/popout/:tabId" element={<Popout />} />
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default NavigationRoutes;
