import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../CSS/prom_bg.css";
import axios from "axios";

function AdminForm() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/drivers")
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/stores")
      .then((res) => {
        setStores(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/coupons")
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/pendingOrders")
      .then((res) => {
        setPendingOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [show, setShow] = useState(false);

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [maximum_use, setMaximumUse] = useState("");
  const [is_relative, setIsRelative] = useState("0");

  const [customers, setCustomers] = useState([]);
  const [stores, setStores] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [driver_ssn, setDriverSSN] = useState([]);
  const [order_id, setOrderID] = useState([]);
  const [driver_user_id, setDriverID] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function changeCoupon(e) {
    setCode(e.target.value);
  }

  function changeDiscount(e) {
    setDiscount(e.target.value);
  }

  function changeMaximumUse(e) {
    setMaximumUse(e.target.value);
  }

  function changeIsRelative(e) {
    setIsRelative(e.target.value);
  }

  function addCoupon(e) {
    //needed validations

    axios
      .post("http://localhost:5000/addCoupon", {
        code,
        discount,
        maximum_use,
        is_relative,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
        if (res.data == -1) {
          console.log(`${code} IS ALREADY IN THE SYSTEM`);
        } else {
          console.log(`SUCCESSFUL INSERTION OF CODE ${res.data.code}`);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h3>Admin</h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Button
                  variant="light"
                  className="addcoupon_btn"
                  onClick={handleShow}
                >
                  {" "}
                  Add New Coupon{" "}
                </Button>
              </Nav.Item>
              <Nav.Link href="/pendingRequests">View Pending Requests</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>Add New Coupon</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container className="AddCoupon">
            <Row>
              <Form>
                <Form.Group className="mb-3 " controlId="couponform">
                  <Form.Control
                    className="form-control w-75"
                    type="string"
                    maxLength={6}
                    placeholder="Enter Coupon"
                    onChange={changeCoupon}
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="couponform">
                  <Form.Control
                    className="form-control w-75"
                    type="string"
                    maxLength={6}
                    placeholder="Enter Discount"
                    onChange={changeDiscount}
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="couponform">
                  <Form.Control
                    className="form-control w-75"
                    type="string"
                    maxLength={6}
                    placeholder="Enter Maximum Use"
                    onChange={changeMaximumUse}
                  />
                </Form.Group>
                <Form.Select
                  className="type mt-3 mb-3"
                  aria-label="Default select example"
                  onChange={changeIsRelative}
                >
                  <option value="0">Actual Discount</option>
                  <option value="1">Relative Discount</option>
                </Form.Select>
                <Button variant="dark" onClick={addCoupon}>
                  Add
                </Button>
              </Form>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
      <Container className="Admin_bg">
        <Tabs
          defaultActiveKey="Customers"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="Customers" title="Customers">
            <h1>Customers</h1>

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr>
                    <td>
                      {customer.id} <Link to={`/users/${customer.id}`}></Link>
                    </td>
                    <td>
                      {customer.user_name}{" "}
                      <Link to={`/users/${customer.id}`}></Link>
                    </td>
                    <td>
                      {customer.email}{" "}
                      <Link to={`/users/${customer.id}`}></Link>
                    </td>
                    <td>
                      <Link to={`/users/${customer.id}`}>
                        <Button className="viewbtn" variant="dark">
                          {" "}
                          View{" "}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="Stores" title="Stores">
            <h1>Stores</h1>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr>
                    <td>
                      {store.id} <Link to={`/stores/${store.id}`}></Link>
                    </td>
                    <td>
                      {store.user_name} <Link to={`/stores/${store.id}`}></Link>
                    </td>
                    <td>
                      {store.email} <Link to={`/stores/${store.id}`}></Link>
                    </td>
                    <td>
                      <Link to={`/stores/${store.id}`}>
                        <Button className="viewbtn" variant="dark">
                          {" "}
                          View{" "}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="Drivers" title="Drivers">
            <h1>Drivers</h1>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr>
                    <td>
                      {driver.id} <Link to={`/drivers/${driver.ssn}`}></Link>
                    </td>
                    <td>
                      {driver.user_name}{" "}
                      <Link to={`/drivers/${driver.ssn}`}></Link>
                    </td>
                    <td>
                      {driver.email} <Link to={`/drivers/${driver.ssn}`}></Link>
                    </td>
                    <td>
                      <Link to={`/drivers/${driver.ssn}`}>
                        <Button className="viewbtn" variant="dark">
                          {" "}
                          View{" "}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="Coupons" title="Coupons">
            <h1>testCoupons</h1>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Details</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr>
                    <td>
                      {coupon.code} <Link to={`/coupons/${coupon.code}`}></Link>
                    </td>
                    <td>
                      <Link to={`/coupons/${coupon.code}`}>
                        <Button className="viewbtn w-30" variant="dark">
                          {" "}
                          View{" "}
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        className="viewbtn w-25"
                        variant="dark"
                        onClick={function (e) {
                          axios
                            .delete(
                              `http://localhost:5000/coupons/${coupon.code}`
                            )
                            .then((res) => {
                              console.log(res);
                              window.location.reload();
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        {" "}
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>

          <Tab eventKey="Pending Orders" title="Pending Orders">
            <h1>Assign them to Drivers</h1>

            {pendingOrders.map((pendingOrder) => (
              <div>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setDriverSSN(e.target.value);
                  }}
                >
                  {drivers.map((driver) => (
                    <option value={driver.ssn}>{driver.ssn} </option>
                  ))}
                </select>

                <Button
                  variant="dark"
                  onClick={function (e) {
                    setOrderID(pendingOrder.id);
                    axios
                      .get(
                        `http://localhost:5000/driveruseridgivenssn`,
                        driver_ssn
                      )
                      .then((res) => {
                        setDriverID(res.data);
                      })
                      .catch((err) => console.log(err));
                    axios
                      .post(`http://localhost:5000/AdminGiveOrderToDriver`, {
                        driver_ssn,
                        order_id,
                        driver_user_id,
                      })
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  {" "}
                  Assign
                </Button>
              </div>
            ))}
          </Tab>
        </Tabs>
      </Container>
    </Fragment>
  );
}

export default AdminForm;
