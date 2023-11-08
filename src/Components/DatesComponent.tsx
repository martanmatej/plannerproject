import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGlobalState } from "../App";

export default function DatesComponent() {
  const date = new Date();
  const [dateObject, setDate] = useState<Date[]>([]);
  const [minimalDate, setMinimalDate] = useGlobalState("minimalDate");

  function getDaysInMonth(month: number, year: number) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  useEffect(() => {
    setDate(getDaysInMonth(date.getMonth() + 1, date.getFullYear()));
    setMinimalDate(date.getMonth() + 1);
  }, []);

  return (
    <>
      <Navbar
        style={{ display: "flex", justifyContent: "left" }}
        bg="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Collapse className="me-auto">
            <Navbar.Text
              style={{
                display: "flex",
                justifyContent: "left",
                paddingLeft: "0.5vw",
              }}
            >
              Kód
            </Navbar.Text>
            <Navbar.Brand
              className="me-auto"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: "1vw",
                width: "12%",
                textAlign: "center",
              }}
            >
              Položka
            </Navbar.Brand>
            {dateObject.map((item) => {
              return (
                <Navbar.Text
                  className="me-auto"
                  style={{
                    borderStyle: "none none none solid",
                    paddingLeft: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {item.getDate()}.{item.getMonth()}
                </Navbar.Text>
              );
            })}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
