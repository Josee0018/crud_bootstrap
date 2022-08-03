import "./App.scss";

import ButtonB from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [personSelect, setPersonSelect] = useState("");
  const [personSelectName, setPersonSelectName] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [input, setInput] = useState({
    id: "",
    name: "",
    lastname: "",
    gender: "",
    address: "",
    birthday: "",
  });
  const genders = [
    { name: "male", value: "male" },
    { name: "female", value: "female" },
  ];
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: "Jose",
      lastname: "Alvarez",
      gender: "male",
      address: "Av. Don Bosco",
      birthday: "1994-03-18",
    },
    {
      id: 2,
      name: "Juan",
      lastname: "Antonio",
      gender: "male",
      address: "Calle Guayas",
      birthday: "1989-08-26",
    },
  ]);
  const resetForm = () => {
    setInput({
      id: "",
      name: "",
      lastname: "",
      gender: "",
      address: "",
      birthday: "",
    });
    setIsEditable(false);
  };
  const setEditForm = (data) => {
    setIsEditable(true);
    setInput(data);
  };
  const handleModalDelete = (data) => {
    setShowModalDelete(!showModalDelete);
    setPersonSelect(data.id);
    setPersonSelectName(data.name)
  };
  const handleModalEdit = (type, data) => {
    setShowModal(!showModal);
    const CONDITION = {
      reset: () => resetForm(),
      edit: () => setEditForm(data),
    };
    CONDITION[type]();
  };
  const editPerson = async () => {
    console.log(
      ...persons.splice(input.id - 1, 1, {
        id: input.id,
        name: input.name,
        lastname: input.lastname,
        gender: input.gender,
        address: input.address,
        birthday: input.birthday,
      })
    );
    handleModalEdit("reset");
  };

  const deletePerson = (item) => {
    let newList = persons.filter((e) => e.id !== personSelect);
    console.log(newList);
    setPersons(newList);
    setShowModalDelete(!showModalDelete);
    setPersonSelect("");
  };

  const addPerson = async () => {
    let newId = persons.length + 1;
    setPersons([
      ...persons,
      {
        id: newId,
        name: input.name,
        lastname: input.lastname,
        gender: input.gender,
        address: input.address,
        birthday: input.birthday,
      },
    ]);
    handleModalEdit("reset");
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container">
        <div className="container">
          <h2>
            Ajax CRUD with bootstrap modals and Datatables with Bulk Delete
          </h2>
          <h2>Person Data</h2>
        </div>
        <ButtonB
          variant="success"
          onClick={() => handleModalEdit("reset")}
          type="summit"
          size="sm"
        >
          <div>Add Person</div>
        </ButtonB>
        <Modal show={showModal} onHide={() => handleModalEdit("reset")}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  key="id"
                  name="id"
                  hidden
                  value={input.id}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  key="name"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  placeholder='"Juan" , "Maximiliano" , "John"'
                  autoFocus
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  key="lastname"
                  name="lastname"
                  value={input.lastname}
                  onChange={handleInputChange}
                  placeholder='"Alvarez" , "Perez" , "Smith"'
                />
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Row xs={6}>
                  {genders.map((gender, idx) => (
                    <Col key={idx}>
                      <ToggleButton
                        id={`genders-${idx}`}
                        type="checkbox"
                        variant={
                          idx % 2 ? "outline-primary" : "outline-primary"
                        }
                        name="gender"
                        value={gender.value}
                        checked={input.gender === genders.value}
                        onChange={handleInputChange}
                      >
                        {gender.name}
                      </ToggleButton>
                    </Col>
                  ))}
                </Row>
              </Form.Group>
              <ButtonGroup className="mb-2"></ButtonGroup>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  key="address"
                  name="address"
                  value={input.address}
                  onChange={handleInputChange}
                  placeholder='"Av. Don Bosco" , "Primero de mayo 3-75 y felipe II" , "Barcelona 51652"'
                  autoFocus
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  key="birthday"
                  name="birthday"
                  placeholder="Due date"
                  value={input.birthday}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonB
              variant="primary"
              onClick={isEditable ? editPerson : addPerson}
            >
              {isEditable ? "Edit person" : "Add person"}
            </ButtonB>
          </Modal.Footer>
        </Modal>

        <Modal
          id="modal_delete"
          show={showModalDelete}
          onHide={() => handleModalDelete()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Person</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete to {personSelectName ? personSelectName : ""}?</Modal.Body>
          <Modal.Footer>
            <ButtonB variant="secondary" onClick={() => handleModalDelete()}>
              Close
            </ButtonB>
            <ButtonB variant="primary" onClick={() => deletePerson()}>
              Confirm
            </ButtonB>
          </Modal.Footer>
        </Modal>

        <div className="container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Date of birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.birthday}</td>
                    <td>
                      <Row xs={12}>
                        <Col xs={5}>
                          <ButtonB
                            variant="primary"
                            value={item.id}
                            onClick={() => handleModalEdit("edit", item)}
                          >
                            editar
                          </ButtonB>
                        </Col>
                        <Col xs={5}>
                          <ButtonB
                            variant="danger"
                            value={item.id}
                            onClick={() => handleModalDelete(item)}
                          >
                            eliminar
                          </ButtonB>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default App;
