import React, { useEffect, useState, useContext, createContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import ModalComponent from "./ModalComponent";
import "bootstrap/dist/css/bootstrap.min.css";

export interface randomItems {
  id: number;
  name: string;
  dateStart: number;
  dateEnd: number;
  callendarArray: number[];
  currentState: string;
}

export default function ListComponent() {
  const arrayStates: string[] = ["Nová", "V přípravě", "Hotová"];
  const [randomItems, setRandomItems] = useState<randomItems[]>([
    {
      id: Math.floor(Math.random() * 10),
      name: "Zakazka" + Math.floor(Math.random() * 10),
      dateStart: Math.floor(Math.random() * 20),
      dateEnd: Math.floor(Math.random() * 10),
      callendarArray: [],
      currentState: arrayStates[0],
    },
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);
  function openModal(id: number) {
    setRowId(id);
    setShowModal(true);
  }

  function generateRandomArray(length: number): number[] {
    const randomArray = [];
    for (let j = 0; j < length; j++) {
      randomArray.push(Math.floor(Math.random() * (10 - 3 + 1)));
    }
    return randomArray;
  }

  function setColorSpan(itemState: string) {
    let value: string = "";
    switch (itemState) {
      case arrayStates[2]:
        value = "table-danger";
        break;
      case arrayStates[1]:
        value = "table-warning";
        break;
      case arrayStates[0]:
        value = "table-success";
        break;
    }
    return value;
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
        currentState: arrayStates[Math.floor(Math.random() * 3)],
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
      <Table striped bordered hover variant="dark" responsive="lg">
        {randomItems.map((item: randomItems) => {
          return (
            <tbody style={{ width: "100%" }} key={item.id}>
              <tr>
                <td style={{ width: "5%" }}>{item.id}</td>
                <td style={{ width: "10%" }}>{item.name}</td>
                {item.callendarArray.map((value, index) => {
                  let style = "dark";
                  if (item.callendarArray[index - 1] > value) {
                    style = "white";
                  }
                  let classStyle = setColorSpan(item.currentState);
                  return (
                    <td
                      style={{ maxWidth: "1%", paddingRight: "50%" }}
                      className={classStyle}
                      onClick={() => {
                        openModal(item.id);
                      }}
                    ></td>
                  );
                })}
              </tr>
            </tbody>
          );
        })}
      </Table>
      <ModalComponent
        modalShow={showModal}
        onDataFromChild={(data) => {
          setShowModal(data);
        }}
        listInitial={randomItems}
        rowId={rowId}
        arrayStates={arrayStates}
      />
    </>
  );
}
