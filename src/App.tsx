import { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationRoutes from "./navigation/NavigationRoutes";
import AppTheme from "./components/AppTheme";
import AppSandbox from "./components/AppSandbox";
import handleBreakingChanges from "./BreakingChanges";
import { persistor, store } from "./state/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import AppPopout from "./components/popout/AppPopout";
import { AuthProvider } from "react-auth-kit";

export const BASENAME = "/turbo-trade-hub";

const Loader: FC = () => {
  return <div>Loading...</div>;
};

function App() {
  useEffect(() => {
    handleBreakingChanges();
  }, []);

  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_ipaAuth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <BrowserRouter basename={BASENAME}>
        <ReduxProvider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <AppTheme>
              <AppSandbox>
                <AppPopout>
                  <NavigationRoutes />
                </AppPopout>
              </AppSandbox>
            </AppTheme>
          </PersistGate>
        </ReduxProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
