import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { randomItems } from "./ListComponent";

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

export default function ModalComponent(props: props) {
  const [showModal, setShowModal] = useState(props.modalShow);
  const [listStates, setListStates] = useState(props.listInitial);
  const [startDate, setStartDate] = useState(new Date());
  const [activeButton, setActiveButton] = useState({
    first: false,
    middle: false,
    last: false,
  });
  const dateStart = new Date();
  const dateEnd = new Date();
  dateStart.setDate(listStates[props.rowId].dateStart);
  dateEnd.setDate(listStates[props.rowId].dateEnd);

  useEffect(() => {
    handleDates(props.rowId);
  }, [dateEnd]);

  useEffect(() => {
    setListStates(props.listInitial);
    //handleStates();
    setShowModal((prevShowModal) => {
      if (prevShowModal !== props.modalShow) {
        return props.modalShow;
      }
      return prevShowModal;
    });
  }, [props.modalShow, props.listInitial]);

  const handleClose = () => {
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
  }

  function handleStates(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    setListStates((prevListStates) =>
      prevListStates.map((item) =>
        item.currentState !==
          props.arrayStates[Number.parseInt(event.currentTarget.id)] &&
        item.id === props.rowId
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

  function handleSelectionDates(date: Date) {
    setListStates((prevListStates) => {
      const updatedListState = prevListStates.map((item) =>
        item.id === props.rowId
          ? {
              ...item,
              dateStart: firstDateSelected ? date.getDate() : item.dateStart,
              dateEnd: firstDateSelected ? item.dateEnd : date.getDate(),
            }
          : item
      );

      setFirstDateSelected(!firstDateSelected);

      console.log(
        "HELL ",
        updatedListState[props.rowId].dateStart,
        updatedListState[props.rowId].dateEnd
      );

      return updatedListState;
    });
  }

  useEffect(() => {
    props.listUpdate(listStates);
  }, [listStates]);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", opacity: 1 }}
    >
      <Modal show={showModal} onHide={handleClose} size="sm">
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Nastavit zakázku</Modal.Title>
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
          Momentální stav zakázky.
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zavřít
          </Button>
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
