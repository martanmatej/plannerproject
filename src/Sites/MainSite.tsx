import React, { useState, createContext, useContext } from "react";
import DatesComponent from "../Components/DatesComponent";
import ListComponent from "../Components/ListComponent";

export default function MainSite() {
  return (
    <>
      <header>
        <DatesComponent />
      </header>
      <body>
        <ListComponent />
      </body>
    </>
  );
}
