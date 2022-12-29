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
import "../CSS/prom_bg.css";
import "../CSS/Style.css";
import axios from "axios";
function ViewReplies() {
    if (localStorage.length == 0) window.location.href = "/";
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData.type != 2) window.location.href = "/login";
    const [id, setID] = useState(userData.id);
    const [tickets, setticket] = useState([]);
    useEffect(() => {
    axios
    .get(`http://localhost:5000/userViewTickets/${id}`)
    .then((res) => {
      setticket(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}, []);


  return (
<Fragment>
    <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">
        <h3>Tickets & Replies</h3>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      </Navbar.Collapse>
    </Container>
  </Navbar>
    
  <table class="table table-striped">
  <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Ticket</th>
    <th scope="col">Reply</th>
    </tr>
  </thead>
  <tbody>
  {tickets.map((ticket,index) => (
    <tr>
      <th scope="row">{index+1}</th>
      <td>{ticket.user_complaint}</td>
      <td>{ticket.admin_reply}</td>
    </tr>
     ))}
     </tbody>

   </table>

   
    </Fragment>
  )
}

export default ViewReplies