import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-date-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGlobalState } from "../App";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface props{
  modalShow: boolean,
  onDataFromChild: (data: boolean) => void,
}

export default function ModalComponent(props: props) {
  const [showModal, setShowModal] = useState(props.modalShow);
  const [value, onChange] = useState<Value>(new Date());
  const [minimalDate, setMinimalDate] = useGlobalState("minimalDate");

  useEffect(() => {
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

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", opacity: 1 }}
    >
      <Modal
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header
          closeButton
          onClick={handleClose}
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
            onClick={handleClose}
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
