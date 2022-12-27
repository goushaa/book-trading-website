import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import "../CSS/prom_bg.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AccountInfo() {
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/cities")
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [city_name, setCity] = useState("Giza");
  const [city_id, setCityID] = useState([]);
  const [cities, setCities] = useState([]);
  const [viewUser, setUser] = useState([]);

  function savechanges(e) {
    axios
      .post("http://localhost:5000/cityidfromcityname", { city_name })
      .then((res) => {
        setCityID(res.data.id);
        console.log(res.data.id);
      })
      .catch((err) => console.log(err));
    const first = viewUser.first_name;
    const last = viewUser.last_name;
    const address = viewUser.address;
    const user_name = viewUser.user_name;
    axios
      .post("http://localhost:5000/updateUser", {
        first,
        last,
        address,
        city_id,
        user_name,
        id,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function changeFirst(e) {
    viewUser.first_name = e.target.value;
  }

  function changeLast(e) {
    viewUser.last_name = e.target.value;
  }

  function changeCity(e) {
    setCity(e.target.value);
  }

  function changeAddress(e) {
    viewUser.address = e.target.value;
  }

  function changeUser(e) {
    viewUser.user_name = e.target.value;
  }
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <h3>Account</h3>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as{" "}
              <Container className="username">{viewUser.user_name}</Container>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="uname">
        {viewUser.first_name} {viewUser.last_name}
      </Container>
      <Container className="mt-3 mb-3  w-25">
        <div className="text">First Name</div>
        <Form.Control
          className=" box mt-1 mb-3"
          type="text"
          defaultValue={viewUser.first_name}
          onChange={changeFirst}
        />
        <div className="text">Last Name</div>
        <Form.Control
          className=" box mt-1 mb-3"
          type="text"
          defaultValue={viewUser.last_name}
          onChange={changeLast}
        />
        <div className="text">Address</div>
        <Form.Control
          className=" box mt-1"
          type="text"
          defaultValue={viewUser.address}
          onChange={changeAddress}
        />
        <div className="text">City</div>
        <Form.Select
          className="box mt-1"
          aria-label="Default select example"
          onChange={changeCity}
        >
          {cities.map((city) => (
            <option key={city.id}>{city.name} </option>
          ))}
        </Form.Select>
        <div className="text">UserName</div>
        <Form.Control
          className=" box mt-1"
          type="text"
          defaultValue={viewUser.user_name}
          onChange={changeUser}
        />
        <div className="text">Email</div>
        <p>{viewUser.email}</p>
        <Row>
          <Col>
            <Link to={"../"}>
              <Button className="logout mt-3">Log Out</Button>
            </Link>
          </Col>
          <Col>
            <Button className="save mt-3" onClick={savechanges}>
              Save Changes
            </Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default AccountInfo;
