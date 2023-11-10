import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
}

export default function ModalComponent(props: props) {
  const [showModal, setShowModal] = useState(props.modalShow);
  const [minimalDate, setMinimalDate] = useGlobalState("minimalDate");
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    handleDates(props.rowId);
    setShowModal((prevShowModal) => {
      if (prevShowModal !== props.modalShow) {
        return props.modalShow;
      }
      return prevShowModal;
    });
  }, [props.modalShow]);

  const handleClose = () => {
    props.onDataFromChild(false);
  };

  function handleDates(id: number){
    props.listInitial.map(item => {
      if(item.id == id){
        var dateObject = new Date();
        dateObject.setDate(item.dateStart);
        if(item.dateStart == 0){
          dateObject.setDate(item.dateStart+1);
          dateObject.setMonth(dateObject.getMonth()+1);
        }
        setStartDate(dateObject);
      }
    })
  }

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", opacity: 1}}
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
