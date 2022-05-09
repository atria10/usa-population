import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { switchReducer } from "./switch/switch.reducer";



const rootReducer = combineReducers({
  switch: switchReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
