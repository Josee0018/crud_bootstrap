import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToggleButton from "react-bootstrap/ToggleButton";



const Modalinput = (props) => {
  const { show, onHide, onClick, children, handleInputChange, input, genders } = props;
  return (
    <Modal show={show} onHide={onHide}>
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
            <Form.Label>lastname</Form.Label>
            <Form.Control
              type="text"
              key="lastname"
              name="lastname"
              value={input.lastname}
              onChange={handleInputChange}
              placeholder='"Alvarez" , "Romero" , "Perez"'
              autoFocus
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
        <Button variant="primary" onClick={onClick}>
          {children}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modalinput;
