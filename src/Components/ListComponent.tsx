import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ModalComponent from "./ModalComponent";
import ModalAddComponent from "./ModalAddComponent";
import ModalSetComponent from "./ModalSetComponent";
import "bootstrap/dist/css/bootstrap.min.css";

export interface randomItems {
  id: number;
  name: string;
  dateStart: number;
  dateEnd: number;
  callendarArray: number[];
  currentState: string;
  upperContract: number | null;
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
      upperContract: null,
    },
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [setModal, setSetModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);

  function openModal(id: number) {
    setRowId(id-1);
    setShowModal(true);
  }

  function generateRandomArray(length: number): number[] {
    const randomArray = [];
    for (let j = 0; j < length + 1; j++) {
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
      default:
        value = "table-default";
        break;
    }
    return value;
  }

  function fillArray(start: number, stop: number) {
    var i = start;
    var items = [];
    for (i; i < stop - 1; i++) {
      var item: randomItems = {
        id: i,
        name: "Zakazka " + Math.floor(Math.random() * (i - 2 + 1)),
        dateStart: Math.floor(Math.random() * (10 - 3 + 1)),
        dateEnd: Math.floor(Math.random() * (30 - 5 + 1)),
        callendarArray: generateRandomArray(stop - start),
        currentState: arrayStates[Math.floor(Math.random() * 3)],
        upperContract: null,
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

  function openModalAdd(id: number) {
    setAddModal(true);
  }

  function openModalSet(id: number) {
    setRowId(id);
    setSetModal(true);
  }

  useEffect(() => {
    setRandomItems(fillArray(1, 20));
  }, []);

  return (
    <>
      <ModalAddComponent
        modalShow={addModal}
        onDataFromChild={(data) => {
          setAddModal(data);
        }}
        listInitial={randomItems}
        rowId={rowId}
        arrayStates={arrayStates}
        listUpdate={(data) => {
          setRandomItems(data);
        }}
      />
      <ModalSetComponent
        modalShow={setModal}
        onDataFromChild={(data) => {
          setSetModal(data);
        }}
        listInitial={randomItems}
        rowId={rowId}
        arrayStates={arrayStates}
        listUpdate={(data) => {
          setRandomItems(data);
        }}
      />
      <Table
        striped
        bordered
        hover
        variant="dark"
        responsive="lg"
        onClick={() => {
          /*randomItems.forEach((item) => {
            if(item.callendarArray.length){
              console.log(item.id ,item.dateEnd, item.dateStart)
            }
            if (item.id === rowId && item.callendarArray.length === 0 && item.currentState === '') {
              openModalSet(rowId);
            }
          });*/
        }}
      >
        <thead
          onClick={() => {
            openModalAdd(rowId);
          }}
        >
          <tr>
            <td>+</td>
            <td>Přidat zakázku</td>
          </tr>
        </thead>
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
                      className={`${classStyle} ${
                        classStyle === "table-default" ? "empty-cell" : ""
                      }`}
                      onClick={() => {
                        if (
                          item.callendarArray.length > 0 &&
                          item.dateStart !== undefined
                        ){
                          //console.log(item.id, item.dateStart, item.dateEnd);
                          openModal(item.id);
                        }
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
        listUpdate={(data) => {
          setRandomItems(data);
        }}
      />
    </>
  );
}
