import React, { useEffect, useState, useContext, createContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import ModalComponent from "./ModalComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGlobalState } from "../App";

interface randomItems {
  id: number;
  name: string;
  dateStart: number;
  dateEnd: number;
  callendarArray: number[];
}

export default function ListComponent() {
  const [randomItems, setRandomItems] = useState<randomItems[]>([
    {
      id: Math.floor(Math.random() * 10),
      name: "Zakazka" + Math.floor(Math.random() * 10),
      dateStart: Math.floor(Math.random() * 20),
      dateEnd: Math.floor(Math.random() * 10),
      callendarArray: [],
    },
  ]);
  const [showModal, setShowModal] = useGlobalState("viewModal");

  function openModal() {
    setShowModal(true);
  }

  function generateRandomArray(length: number): number[] {
    const randomArray = [];
    for (let j = 0; j < length; j++) {
      randomArray.push(Math.floor(Math.random() * (10 - 3 + 1)));
    }
    return randomArray;
  }

  function fillArray(start: number, stop: number) {
    var i = start;
    var items = [];
    for (i; i < stop; i++) {
      var item: randomItems = {
        id: i,
        name: "Zakazka " + Math.floor(Math.random() * (i - 2 + 1)),
        dateStart: Math.floor(Math.random() * (10 - 3 + 1)),
        dateEnd: Math.floor(Math.random() * (30 - 5 + 1)),
        callendarArray: generateRandomArray(stop - start),
      };
      if (item.dateEnd < item.dateStart) {
        var switching = item.dateStart;
        item.dateStart = item.dateEnd;
        item.dateStart = switching;
      }
      item.callendarArray = generateRandomArray(item.dateEnd - item.dateStart);
      items.push(item);
    }
    return items;
  }

  useEffect(() => {
    setRandomItems(fillArray(1, 20));
  }, []);

  return (
    <>
      <Table
        striped
        bordered
        hover
        variant="dark"
        onClick={() => {
          openModal();
        }}
      >
        <ModalComponent />
        {randomItems.map((item: randomItems) => {
          return (
            <tbody style={{ width: "100%" }}>
              <tr>
                <td style={{ width: "5%" }}>{item.id}</td>
                <td style={{ width: "10%" }}>{item.name}</td>
                {item.callendarArray.map((value, index) => {
                  let style = "dark";
                  if (item.callendarArray[index - 1] > value) {
                    style = "white";
                  }
                  return (
                    <td style={{ maxWidth: "1%", paddingRight: "50%" }}></td>
                  );
                })}
              </tr>
            </tbody>
          );
        })}
      </Table>
    </>
  );
}
