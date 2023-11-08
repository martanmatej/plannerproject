import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-date-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGlobalState } from "../App";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ModalComponent() {
  const [showModal, setShowModal] = useGlobalState("viewModal");
  const [value, onChange] = useState<Value>(new Date());
  const [minimalDate, setMinimalDate] = useGlobalState("minimalDate");

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", opacity: 1 }}
    >
      <Modal
        show={showModal}
        onHide={() => {
          handleClose();
        }}
      >
        <Modal.Header
          closeButton
          onClick={() => {
            setShowModal(false);
          }}
        >
          <Modal.Title>Nastavit zakázku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Zde nastavte čas zakázky a uložte.
          <DatePicker
            returnValue="range"
            onChange={onChange}
            value={value}
            minDate={new Date(minimalDate)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
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
