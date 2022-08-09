import "./App.scss";

import ButtonB from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect } from "react";
import Modalinput from "./components/Modalinput";
import ModalDelete from "./components/ModalDelete";
import { useDispatch, useSelector } from "react-redux";
import { getPersons } from "./redux/actions/person/person.actions";
import TitleHeader from "./components/TitleHeader";

const App = () => {
  const dispatch = useDispatch();
  const { list, isLoadingList, errorList } = useSelector(
    ({ personReducer }) => personReducer
  );
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
  const [persons, setPersons] = useState(
    // JSON.parse(localStorage.getItem("persons"))
    null
  );

  useEffect(() => {
    dispatch(getPersons());
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (list !== null && persons === null) {
      setPersons(list);
    }
    //eslint-disable-next-line
  }, [list]);
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
    if (data) {
      setShowModalDelete(!showModalDelete);
      setPersonSelect(data.id);
      setPersonSelectName(data.name);
    }
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
    persons.splice(input.id - 1, 1, {
      id: input.id,
      name: input.name,
      lastname: input.lastname,
      gender: input.gender,
      address: input.address,
      birthday: input.birthday,
    });

    localStorage.setItem("persons", JSON.stringify(persons));
    handleModalEdit("reset");
  };

  const deletePerson = (item) => {
    let newList = persons.filter((e) => e.id !== personSelect);
    setPersons(newList);
    setShowModalDelete(!showModalDelete);
    localStorage.setItem("persons", JSON.stringify(newList));

    setPersonSelect("");
  };

  const addPerson = async () => {
    handleModalEdit("reset");
    const localPersons = localStorage.getItem("persons");
    if (localPersons) {
      let newId = persons.length + 1;
      const arrayPerson = [
        ...persons,
        {
          id: newId,
          name: input.name,
          lastname: input.lastname,
          gender: input.gender,
          address: input.address,
          birthday: input.birthday,
        },
      ];
      setPersons(arrayPerson);
      localStorage.setItem("persons", JSON.stringify(arrayPerson));
    } else {
      const arrayPerson = [
        {
          id: 1,
          name: input.name,
          lastname: input.lastname,
          gender: input.gender,
          address: input.address,
          birthday: input.birthday,
        },
      ];

      setPersons(arrayPerson);
      localStorage.setItem("persons", JSON.stringify(arrayPerson));
    }
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  if (isLoadingList) {
    return "loading";
  }
  if (errorList) {
    return "error";
  }
  return (
    <>
      <div className="container">
        <TitleHeader />
        <ButtonB
          variant="success"
          onClick={() => handleModalEdit("reset")}
          type="summit"
          size="sm"
        >
          <div>Add Person</div>
        </ButtonB>
        <Modalinput
          show={showModal}
          onHide={() => handleModalEdit("reset")}
          onClick={isEditable ? editPerson : addPerson}
          handleInputChange={handleInputChange}
          input={input}
          genders={genders}
        >
          {isEditable ? "Edit person" : "Add person"}
        </Modalinput>

        <ModalDelete
          show={showModalDelete}
          onHide={() => handleModalDelete("reset")}
          personSelectName={personSelectName}
          onClick={handleModalDelete}
          onEjecute={() => deletePerson()}
        ></ModalDelete>

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
              {persons?.map((item) => {
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
