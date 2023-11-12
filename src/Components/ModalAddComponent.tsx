import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
  const [idState, setIdState] = useState<number>(0);
  const [nameState, setNameState] = useState<string>("");
  const [showError, setErrorText] = useState<string>("");

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

  const [firstDate, setFirstDate] = useState(true);

  function handleSelectionDates(date: Date) {
    setListStates((prevListStates) =>
      prevListStates.map((item) =>
        item.id === props.rowId
          ? firstDate
            ? {
                ...item,
                dateStart: date.getDate() + 1,
              }
            : { ...item, dateEnd: date.getDate() + 1 }
          : item
      )
    );
    setFirstDate(!firstDate);
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
          <Modal.Title>Přidat zakázku</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nastavte kód (číslo) zakázky:</Form.Label>
              <p style={{ color: "red" }}>{showError}</p>
              <Form.Control
                type="string"
                value={idState}
                onChange={(e) => {
                  try {
                    setIdState(Number.parseInt(e.target.value));
                    setErrorText("");
                    if (Number.isNaN(idState)) {
                      setErrorText("Kód musí být číslo!");
                      setIdState(0);
                    }
                  } catch (e) {
                    console.log(e);
                    setIdState(0);
                  }
                }}
              />
              <Form.Label>Zadejte název zakázky:</Form.Label>
              <Form.Control
                type="string"
                value={nameState}
                onChange={(e) => {
                  setNameState(e.target.value);
                }}
              />
              <Form.Label>Zadejte nadřazenou zakázku:</Form.Label>
              <DropdownButton id="dropdown-basic-button" title="Zakázka">
                {listStates.map((item) => {
                    return <Dropdown.Item id={item.id.toString()} >
                        {item.id}
                    </Dropdown.Item>
                })}
              </DropdownButton>
            </Form.Group>
          </Form>
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
