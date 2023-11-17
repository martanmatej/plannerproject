import React from "react";
import "./App.css";
import MainSite from "./Sites/MainSite";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { viewModal: false, minimalDate: 0 };
export const { useGlobalState, setGlobalState } = createGlobalState(initialState);

function App() {
  const [modal, setModal] = useGlobalState("viewModal");
  const [minimalDate, setMinimalDate] = useGlobalState("minimalDate");

  return (
    <div className="App">
      <MainSite />
    </div>
  );
}

export default App;
