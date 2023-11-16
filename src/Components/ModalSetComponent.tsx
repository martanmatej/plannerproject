import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { randomItems } from "./ListComponent";
import { generateRandomArray } from "./ListComponent";
import DatePicker from "react-datepicker";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface props {
  modalShow: boolean;
  onDataFromChild: (data: boolean) => void;
  listInitial: randomItems[];
  rowId: number;
  arrayStates: string[];
  listUpdate: (list: randomItems[]) => void;
}

interface updateState {
  id: number;
  dateStart: number;
  dateEnd: number;
  callendarArray: number[];
  currentState: string;
}

export default function ModalComponentSet(props: props) {
  const [showModal, setShowModal] = useState(props.modalShow);
  const [listStates, setListStates] = useState(props.listInitial);
  const [startDate, setStartDate] = useState(new Date());
  const [activeButton, setActiveButton] = useState({
    first: true,
    middle: false,
    last: false,
  });
  const dateStart = new Date();
  const dateEnd = new Date();

  const [nameState, setNameState] = useState<string>("");
  const [showError, setErrorText] = useState<string>("");

  useEffect(() => {
    setListStates(props.listInitial);
    handleSetup(props.rowId);
    handleDates(props.rowId);
    setShowModal(props.modalShow);
  }, [props.modalShow, props.listInitial]);

  useEffect(() => {
    setListStates(props.listInitial);
    handleSetup(props.rowId);
  }, [props.listInitial]);

  const handleClose = () => {
    updateArrayColorObjects();
    props.onDataFromChild(false);
  };

  function handleDates(id: number) {
    listStates.map((item) => {
      if (item.id === id) {
        var dateObject = new Date();
        dateObject.setDate(item.dateStart);
        if (item.dateStart == 0) {
          dateObject.setDate(item.dateStart + 1);
          dateObject.setMonth(dateObject.getMonth() + 1);
        }
        setStartDate(dateObject);
        switch (item.currentState) {
          case props.arrayStates[0]:
            setActiveButton({ first: true, middle: false, last: false });
            break;
          case props.arrayStates[1]:
            setActiveButton({ first: false, middle: true, last: false });
            break;
          case props.arrayStates[2]:
            setActiveButton({ first: false, middle: false, last: true });
            break;
        }
      }
    });
    updateArrayColorObjects();
  }

  const updateArrayColorObjects = async () => {
    setListStates((prevListStates) => {
      const updatedList = prevListStates.map((item) =>
        item.rowIndex === props.rowId
          ? {
              ...item,
              callendarArray: generateRandomArray(
                item.dateEnd - item.dateStart
              ),
            }
          : item
      );
      return updatedList;
    });
  };

  function handleSetup(id: number) {
    listStates.map((item) => {
      if (item.rowIndex === id) {
        switch (item.currentState) {
          case props.arrayStates[0]:
            setActiveButton({ first: true, middle: false, last: false });
            break;
          case props.arrayStates[1]:
            setActiveButton({ first: false, middle: true, last: false });
            break;
          case props.arrayStates[2]:
            setActiveButton({ first: false, middle: false, last: true });
            break;
        }
      }
    });
  }

  function handleStates(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    setListStates((prevListStates) =>
      prevListStates.map((item, index) =>
        item.currentState !==
          props.arrayStates[Number.parseInt(event.currentTarget.id)] &&
        item.rowIndex === props.rowId
          ? {
              ...item,
              currentState:
                props.arrayStates[Number.parseInt(event.currentTarget.id)],
            }
          : item
      )
    );
  }
  const [firstDateSelected, setFirstDateSelected] = useState(true);

  // This function is triggered when a date is selected.
  // It updates the start and end dates of the selected item in the list.
  // It also updates the array of random numbers for the selected item.
  function handleSelectionDates(date: Date) {
    setListStates((prevListStates) => {
      const updatedListState = prevListStates.map((item) =>
        item.rowIndex === props.rowId
          ? {
              ...item,
              dateStart: firstDateSelected ? date.getDate() : item.dateStart,
              dateEnd: firstDateSelected ? item.dateEnd : date.getDate(),
            }
          : item
      );
      // Call props.listUpdate with the updated list state
      setFirstDateSelected(!firstDateSelected);
      return updatedListState;
    });
  }

  useEffect(() => {
    updateArrayColorObjects();
    props.listUpdate(listStates);
    console.log(
      listStates[props.rowId].dateStart,
      listStates[props.rowId].dateEnd
    );
  }, [props.modalShow]);

  /*function handleStateUpdate(data: updateState) {
    const newItem: randomItems = {
      id: data.id,
      name: listStates[data.id - 1].name,
      upperContract: listStates[data.id - 1].upperContract,
      dateStart: -1,
      dateEnd: -1,
      callendarArray: [],
      currentState: listStates[data.id - 1].currentState,
    };
    setListStates((prevList) => {
      const updatedList = [...prevList, newItem];
      props.listUpdate(updatedList);
      return updatedList;
    });
    setNameState("");
    setIdState(0);
    setErrorText("");
  }
*/
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", opacity: 1 }}
    >
      <Modal show={showModal} onHide={handleClose} size="sm">
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Moje zakázka</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Zde nastavte čas zakázky a uložte.
          <DatePicker
            selected={startDate}
            id="startDate"
            onChange={(date: Date) => handleSelectionDates(date)}
            selectsStart
            startDate={dateStart}
            endDate={dateEnd}
            selectsEnd
            inline
          />
          Nastavení stavu zakázky.
          <DropdownButton id="dropdown-basic-button" title="Změna stavu">
            <Dropdown.Item
              onClick={handleStates}
              active={activeButton.first}
              id="0"
            >
              {props.arrayStates[0]}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={handleStates}
              active={activeButton.middle}
              id="1"
            >
              {props.arrayStates[1]}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={handleStates}
              active={activeButton.last}
              id="2"
            >
              {props.arrayStates[2]}
            </Dropdown.Item>
          </DropdownButton>
          <br/>
          <FontAwesomeIcon icon={faLightbulb} size="lg" flip="horizontal" />{" "}
          Použití
          <li style={{ fontSize: 14 }}>Klikněte na datum začátku a následně konce data zakázky.</li>
          <li style={{ fontSize: 14 }}>Nyní vyberte stav zakázky.</li>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            Uložit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
