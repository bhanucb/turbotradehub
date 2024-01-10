import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationRoutes from "./navigation/NavigationRoutes";
import AppTheme from "./components/AppTheme";
import { persistor, store } from "./state/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";

export const BASENAME = "/";

const Loader: FC = () => {
  return <div>Loading...</div>;
};

function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <ReduxProvider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <AppTheme>
            <NavigationRoutes />
          </AppTheme>
        </PersistGate>
      </ReduxProvider>
    </BrowserRouter>
  );
}

export default App;
