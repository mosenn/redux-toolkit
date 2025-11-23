import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "user-storage",
  storage,
  whitelist: ["user"], // فقط user نگه داشته شود
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware),
});

export const persistor = persistStore(store);

// برای TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
