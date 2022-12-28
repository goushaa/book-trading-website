import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../CSS/prom_bg.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function Driver() {
  useEffect(() => {
    axios
      .post("http://localhost:5000/driverssnfromdriverid", { id })
      .then((res) => {
        setssn(res.data.ssn);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:5000/ordersbycertaindriver/${ssn}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let { id } = useParams();
  const [ssn, setssn] = useState(0);

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h3>Driver</h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="Store_bg">
        <Tabs
          defaultActiveKey="AddBook"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="ViewAssignedOrders" title="View Assigned Orders"></Tab>
          <Tab
            eventKey="ViewDeliveredOrders"
            title="View Delivered Orders"
          ></Tab>
          <Tab eventKey="ViewWishlist" title="View Customers' Wishlists"></Tab>
        </Tabs>
      </Container>
    </Fragment>
  );
}

export default Driver;
