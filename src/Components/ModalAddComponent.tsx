import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { randomItems } from "./ListComponent";

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
  name: string;
  upperContract: number | null;
}

export default function ModalComponent(props: props) {
  const [showModal, setShowModal] = useState(props.modalShow);
  const [listStates, setListStates] = useState(props.listInitial);
  const [idState, setIdState] = useState<number>(0);
  const [nameState, setNameState] = useState<string>("");
  const [showError, setErrorText] = useState<string>("");

  useEffect(() => {
    setListStates(props.listInitial);
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

  function handleStateUpdate(data: updateState) {
    const newItem: randomItems = {
      id: data.id,
      name: data.name,
      upperContract: data.upperContract,
      dateStart: -1,
      dateEnd: -1,
      callendarArray: [],
      currentState: props.arrayStates[0],
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
                  const newId = Number.parseInt(e.target.value);

                    const idExists = listStates.some(
                      (item) => item.id === newId
                    );

                    if (idExists) {
                      setErrorText("Zakázka s tímto ID už existuje");
                      setIdState(newId);
                    } else {
                      setErrorText("");
                      setIdState(newId);
                      if (Number.isNaN(newId)) {
                        setErrorText("Kód musí být číslo!");
                        setIdState(0);
                        return 0;
                      } else {
                        setIdState(newId);

                      }
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
                  return (
                    <Dropdown.Item id={item.id.toString()}>
                      {item.id}
                    </Dropdown.Item>
                  );
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
              handleStateUpdate({
                id: idState,
                name: nameState,
                upperContract: 100,
              });
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
