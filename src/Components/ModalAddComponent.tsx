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
  upperContract: number[];
  rowIndex: number;
}

export default function ModalComponent(props: props) {
  const [showModal, setShowModal] = useState(props.modalShow);
  const [listStates, setListStates] = useState(props.listInitial);
  const [idState, setIdState] = useState<number>(0);
  const [nameState, setNameState] = useState<string>("");
  const [showError, setErrorText] = useState<string>("");
  const [selectedUpperContract, setSelectedUpperContract] = useState<number[]>(
    []
  );

  useEffect(() => {
    setListStates(props.listInitial);
    setShowModal(props.modalShow);
  }, [props.modalShow, props.listInitial]);

  const handleClose = () => {
    props.onDataFromChild(false);
  };

  const [indexToAccess, setIndexToAccess] = useState(1);

  function handleStateUpdate(data: updateState) {
    const newItem: randomItems = {
      id: data.id - 1,
      name: data.name,
      upperContract: data.upperContract,
      dateStart: 1,
      dateEnd: 1,
      callendarArray: [],
      currentState: props.arrayStates[0],
      rowIndex: listStates.length,
    };
    setListStates((prevList) => {
      // Map over prevList and return a new object for each item with the updated rowIndex
      const newList = prevList.map((item, index) => ({
        ...item,
        rowIndex: index,
      }));

      return newList;
    });
    setListStates((prevList) => {
      const newList = [...prevList];

      if (selectedUpperContract.length > 0) {
        insertAt(newList, indexToAccess, newItem);
        console.log("b", newList);
        props.listUpdate(newList);
        return newList;
      } else {
        console.log("a");
        const updatedList = [...newList, newItem];
        props.listUpdate(updatedList);
        return updatedList;
      }
    });
    setNameState("");
    setIdState(0);
    setErrorText("");
    setSelectedUpperContract([]);
  }

  useEffect(() => {
    if (!showModal) {
      props.listUpdate(listStates);
    }
    //console.log(listStates);
  }, [showModal, listStates]);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", opacity: 1 }}
    >
      {showModal && (
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
                      <Dropdown.Item
                        id={item.id.toString()}
                        onClick={(e) => {
                          setIndexToAccess(0);
                          setListStates((prevList) => {
                            // Map over prevList and return a new object for each item with the updated rowIndex
                            const newList = prevList.map((item, index) => ({
                              ...item,
                              rowIndex: index,
                            }));
                          
                            return newList;
                          });
                          setIndexToAccess(item.rowIndex + 1);
                          setSelectedUpperContract([
                            ...item.upperContract,
                            item.rowIndex,
                          ]);
                          console.log(indexToAccess, "hh", item.rowIndex);
                        }}
                      >
                        {item.id + 1}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleStateUpdate({
                  id: idState,
                  name: nameState,
                  upperContract: selectedUpperContract,
                  rowIndex: props.rowId,
                });
                handleClose();
              }}
            >
              Přidat
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

function insertAt(array: randomItems[], index: number, newItem: randomItems) {
  array.splice(index, 0, newItem);
}
