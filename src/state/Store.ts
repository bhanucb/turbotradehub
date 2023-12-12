import { combineReducers, configureStore } from "@reduxjs/toolkit";
import popoutReducer from "./PopupSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import sandboxReducer from "./SandboxSlice";
import themeReducer from "./ThemeSlice";
import layoutReducer from "./LayoutSlice";
import pricingSheetReducer from "./PricingSheetSlice";
import tabManagementReducer from "./TabManagementSlice";
import tradeBookingReducer from "./TradeBookingSlice";

const persistReducerConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["pricingSheet", "tabManagement", "layout", "tradeBooking"],
};

const rootReducer = combineReducers({
  popouts: popoutReducer,
  sandbox: sandboxReducer,
  theme: themeReducer,
  layout: layoutReducer,
  pricingSheet: pricingSheetReducer,
  tabManagement: tabManagementReducer,
  tradeBooking: tradeBookingReducer,
});

const persistedReducer = persistReducer(persistReducerConfig, rootReducer);

const stateSyncConfig = {
  blacklist: [PERSIST, PURGE],
};

// const logger = createLogger({
//   collapsed: true,
// });
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(createStateSyncMiddleware(stateSyncConfig)),
  // .concat(logger),
});

initMessageListener(store);

export let persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
