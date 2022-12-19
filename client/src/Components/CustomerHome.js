import React, { Fragment } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Carousel from "react-bootstrap/Carousel";
import Book1 from "../Images/book1.png";
import Book2 from "../Images/book2.png";
import Book3 from "../Images/book3.png";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useLocation } from "react-router-dom";

function CustomerHome() {

  const { state } = useLocation();
  const { email, user_name } = state;
  console.log(email, user_name)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Fragment>
      <Row>
        <Container>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
              <Navbar.Brand className="title" href="#">
                Online Book Store
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                ></Nav>
                <Form>
                  <Form.Control
                    type="search"
                    placeholder="Search for a book"
                    className="searchbar"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" className="searchbtn">
                    Search
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Button className="cart_btn" href="">
            <svg
              className="carticon"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="60"
              color="white"
              class="bi bi-cart3"
              viewBox="0 4 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </Button>
          <Button className="heart_btn" href="">
            <svg
              className="hearticon"
              xmlns="http://www.w3.org/2000/svg"
              color="white"
              width="30"
              height="60"
              fill="white"
              class="bi bi-heart"
              viewBox="0 4 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </Button>
          <Button className="person_btn" href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="60"
              fill="currentColor"
              class="bi bi-person"
              viewBox="0 4 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          </Button>
          <Button className="leftmenu2" onClick={handleShow}>
            ≡
          </Button>
          <Offcanvas className="menu2" show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <h1 className="name">Username</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="110"
                height="70"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <Button className="leftmenu2btn1" href="">
                View account
              </Button>{" "}
              <Button className="leftmenu2btn2">
                Create a business account
              </Button>{" "}
              <Button className="leftmenu2btn3">Add your store</Button>{" "}
              <Button className="leftmenu2btn4">Sign up to deliver</Button>{" "}
              <p className="order_icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  transform="translat"
                  fill="currentColor"
                  class="bi bi-bookmarks-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z" />
                  <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z" />
                </svg>
              </p>
              <p className="coupon_icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-ticket-perforated-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4-1v1h1v-1H4Zm1 3v-1H4v1h1Zm7 0v-1h-1v1h1Zm-1-2h1v-1h-1v1Zm-6 3H4v1h1v-1Zm7 1v-1h-1v1h1Zm-7 1H4v1h1v-1Zm7 1v-1h-1v1h1Zm-8 1v1h1v-1H4Zm7 1h1v-1h-1v1Z" />
                </svg>
              </p>
              <Button className="leftmenu2btn5">Orders</Button>{" "}
              <Button className="leftmenu2btn6">Promotions</Button>{" "}
              <h1 className="line">|</h1>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Row>
      <Row className="salerow">
        <h1 className="salehead">Upto 50% off</h1>
        <p className="saledescription">
          Save with free hand-picked coupons, promo codes, discounts & deals.{" "}
        </p>
        <Button className="salebtn">Shop now</Button>{" "}
        <Container>
          <Carousel
            className="slideshow"
            bg="dark"
            variant="dark"
            activeIndex={index}
            onSelect={handleSelect}
          >
            <Carousel.Item>
              <img className="d-block w-100" src={Book1} alt="First slide" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={Book2} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={Book3} alt="Third slide" />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </Row>
      <Row></Row>
    </Fragment>
  );
}

export default CustomerHome;
