'use client';
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";

const loadState = () => {
  if (typeof window === 'undefined') return undefined; 
  try {
    const serializedState = localStorage.getItem("appState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};
export const makeStore = () => {
  const store =  configureStore({
    reducer: {
      users: usersReducer,
    },
    preloadedState:loadState(),
  });

  store.subscribe(()=>{
    const {users} = store.getState();
   saveState({users})
})
return store
};




