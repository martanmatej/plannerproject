import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainSite from "./Sites/MainSite";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { viewModal: false, minimalDate: 0 };
export const { useGlobalState } = createGlobalState(initialState);

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
