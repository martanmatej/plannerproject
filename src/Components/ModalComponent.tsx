import React, { useState, useContext, useEffect, MouseEventHandler } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGlobalState } from "../App";
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
}

export default function ModalComponent(props: props) {
  const [showModal, setShowModal] = useState(props.modalShow);
  const [listStates, setListStates] = useState(props.listInitial);
  const [minimalDate, setMinimalDate] = useGlobalState("minimalDate");
  const [startDate, setStartDate] = useState(new Date());
  const [activeButton, setActiveButton] = useState({
    first: false,
    middle: false,
    last: false,
  });

  useEffect(() => {
    setListStates(props.listInitial);
    handleDates(props.rowId);
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
    console.log(event.currentTarget.id);
    setListStates(prevListStates => 
      prevListStates.map(item => 
        item.currentState !== props.arrayStates[Number.parseInt(event.currentTarget.id)] ? {
          ...item,
          currentState:
          props.arrayStates[Number.parseInt(event.currentTarget.id)]
        } : item
      )
    );
  }

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
            onChange={(date: Date) => setStartDate(date)}
          />
          Momentální stav zakázky.
          <DropdownButton id="dropdown-basic-button" title="Změna stavu">
            <Dropdown.Item onClick={handleStates} active={activeButton.first} id="0">
              {props.arrayStates[0]}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleStates} active={activeButton.middle} id="1">
              {props.arrayStates[1]}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleStates} active={activeButton.last} id="2">
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
