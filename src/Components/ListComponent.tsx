import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ModalComponent from "./ModalComponent";
import ModalAddComponent from "./ModalAddComponent";
import ModalSetComponent from "./ModalSetComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
export interface randomItems {
  id: number;
  name: string;
  dateStart: number;
  dateEnd: number;
  callendarArray: number[];
  currentState: string;
  upperContract: number | null;
  rowIndex: number;
}

export function generateRandomArray(length: number): number[] {
  const randomArray = [];
  for (let j = 0; j < length + 1; j++) {
    randomArray.push(Math.floor(Math.random() * (10 - 3 + 1)));
  }
  return randomArray;
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
      rowIndex: 0,
    },
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [setModal, setSetModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(0);

  function openModal(id: number) {
    setRowId(id);
    setShowModal(true);
  }

  const [buttonRemoveApproval, setButtonRemoveApproval] =
    useState<boolean>(false);

  function enableRemove(rowId: number, indexArray: number) {
    let lastIndex = randomItems[rowId]?.callendarArray.length - 1;
    if (lastIndex === indexArray) {
      setButtonRemoveApproval(true);
    }
    setRowId(rowId);
  }

  function disableRemove(rowId: number, indexArray: number) {
    let lastIndex = randomItems[rowId].callendarArray.length - 1;
    if (lastIndex === indexArray) {
      setButtonRemoveApproval(false);
    }
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
        name: "Zakazka " + Math.floor(Math.random() * (i - 2 + 2)),
        dateStart: Math.floor(Math.random() * (10 - 3 + 1)),
        dateEnd: Math.floor(Math.random() * (30 - 5 + 1)),
        callendarArray: generateRandomArray(stop - start),
        currentState: arrayStates[Math.floor(Math.random() * 3)],
        upperContract: null,
        rowIndex: i,
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
    setRandomItems(fillArray(0, 20));
  }, []);

  const dateObject = new Date();

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
        style={{ height: "90%", width: "100%" }}
      >
        <thead>
          <tr>
            <td
              onClick={() => {
                openModalAdd(rowId);
              }}
            >
              +
            </td>
            <td
              onClick={() => {
                openModalAdd(rowId);
              }}
            >
              Přidat zakázku
            </td>
            {generateAddingCells(
              new Date(
                dateObject.getFullYear(),
                dateObject.getMonth(),
                0
              ).getDate()
            )}
          </tr>
        </thead>
        {randomItems.map((item: randomItems, index: number) => {
          return (
            <tbody style={{ width: "100%" }}>
              <tr>
                <td
                  style={{ width: "5%" }}
                  onClick={() => {
                    openModalSet(index);
                  }}
                >
                  {item.id + 1}
                </td>
                <td
                  style={{ width: "10%" }}
                  onClick={() => {
                    openModalSet(index);
                  }}
                >
                  {item.name}
                </td>
                {item.callendarArray.map((value, count: number) => {
                  let style = "dark";
                  if (item.callendarArray[count - 1] > value) {
                    style = "white";
                  }
                  let classStyle = setColorSpan(item.currentState);
                  let lastIndex = item.callendarArray.length - 1;
                  return (
                    <td
                      style={{ paddingRight: "50%" }}
                      width={1.1}
                      className={`${classStyle}`}
                      onClick={(e) => {
                        if (
                          e.currentTarget.className.match("table-success") ||
                          e.currentTarget.className.match("table-warning") ||
                          e.currentTarget.className.match("table-danger")
                        ) {
                          openModal(index);
                        }
                      }}
                      onMouseEnter={(e) => enableRemove(item.rowIndex, count)}
                      onMouseLeave={(e) => disableRemove(item.rowIndex, count)}
                    >
                      {buttonRemoveApproval &&
                        lastIndex === count &&
                        item.rowIndex === rowId && (
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            size="sm"
                            style={{ position: "absolute" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowModal(false);
                              setButtonRemoveApproval(false);
                              item.callendarArray = [];
                              item.dateStart = 1;
                              item.dateEnd = 1;
                            }}
                          />
                        )}
                    </td>
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

export function generateAddingCells(numberOfItems: number) {
  let cells = [];
  for (let index = 1; index < numberOfItems; index++) {
    cells.push(<td key={index} style={{ paddingRight: "50%" }} width={1.1} />);
  }
  return cells;
}
