import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import collectionReducer from "./features/collectionSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persist config for search slice
const searchPersistConfig = {
  key: "search",
  storage,
  whitelist: ["query", "activeTab", "results"],
};

// Persist config for collection slice
const collectionPersistConfig = {
  key: "collection",
  storage,
  whitelist: ["liked"],
};

// Wrap reducers
const persistedSearchReducer = persistReducer(searchPersistConfig, searchReducer);
const persistedCollectionReducer = persistReducer(collectionPersistConfig, collectionReducer);

// Configure store
export const store = configureStore({
  reducer: {
    search: persistedSearchReducer,
    collection: persistedCollectionReducer,
  },
  // Disable serializable check for redux-persist actions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
