import "./App.scss";

import ButtonB from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React from "react";

const App = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [input, setInput] = React.useState({
    name: "",
    lastname: "",
  });
  const persons = [
    {
      id: 1,
      name: "Jose",
      lastname: "Alvarez",
      gender: "male",
      address: "Av. Don Bosco",
      birthday: "18/03/1994",
    },
    {
      id: 2,
      name: "Jose",
      lastname: "Antonio",
      gender: "male",
      address: "Calle Guayas",
      birthday: "26/08/1989",
    },
  ];
  
  const addPerson = async (e) => {
    handleClose();
     persons.push({
      id: persons.length+1,
      name: input.name,
      lastname: input.lastname,
      gender: "male",
      address: "Calle Guayas",
      birthday: "26/08/1989",
    });
    setInput({
      name: "",
      lastname: "",
      })
  };

  
  const handleInputChange =(e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      })
    }
  
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
          onClick={(e) => handleShow(e)}
          type="summit"
          size="sm"
        >
          <div>Add Person</div>
        </ButtonB>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
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
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonB
              variant="primary"
              onClick={(e) => addPerson(e)}
            >
              Add person
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
              </tr>
            </thead>
            <tbody>
              {persons.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.birthday}</td>
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
