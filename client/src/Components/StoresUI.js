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
import TestAddbook from "./TestAddbook";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";

function StoresUI() {
  let { id } = useParams();
  console.log(id)

  useEffect(() => {
    axios.get(`http://localhost:5000/userbooks/${id}`).then((res) => {
      setBook(res.data);
    }).catch((err) => console.log(err));

    axios.get(`http://localhost:5000/wishlists_stats/${id}`).then((res) => {
      console.log(res.data);
      setWishlists(res.data);
    }).catch((err) => console.log(err));

  }, []);
  const [book, setBook] = useState([])
  const [wishlists, setWishlists] = useState([])
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h3>Store</h3>
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
          <Tab eventKey="AddBook" title="Add Book">
            <h1>Add a new book</h1>
            <TestAddbook />
          </Tab>
          <Tab eventKey="viewbooks" title="View Books">
            <h1>View books</h1>
            <div className="container mg-t">
              <div className='row'>
                {
                  book.map(book => {
                    return (
                      <div className="col-lg-4 col-md-6 col-12">
                        <div>
                          <Card className="course-card">
                            <Card.Img variant="top" src={book.image}></Card.Img>
                            <Card.Body>
                              <Card.Title>{book.title}</Card.Title>
                              <p>{book.description}</p>

                            </Card.Body>
                          </Card>
                        </div>
                      </div>
                    )
                  })
                }
              </div> {/* ./row*/}
            </div>

          </Tab>
          <Tab eventKey="ViewWishlist" title="View Customers' Wishlists">
            <h1>View Wishlists</h1>
            {
              wishlists.map(wishlist => {
                return (
                  <div className="col-lg-4 col-md-6 col-12">
                    <div>
                      <Card className="course-card">
                        <Card.Img variant="top" src={wishlist.image}></Card.Img>
                        <Card.Body>
                          <Card.Title>book ID: {wishlist.book_id}</Card.Title>
                          <p>Number of users: {wishlist.countUsers}</p>
                          <p>Availability: {wishlist.status}</p>

                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                )
              })
            }


          </Tab>
        </Tabs>
      </Container>
    </Fragment>
  );
}

export default StoresUI;
