import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Row, Card, Button, Form, Container, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Cart() {
  if (localStorage.length == 0) window.location.href = "/";
  const userData = JSON.parse(localStorage.getItem("user"));
  if (userData.type == 1 || userData.type == 0) window.location.href = "/login";
  const [id, setID] = useState(userData.id);
  const [order_id, setorder_id] = useState(0);
  const [coupon_code, setCode] = useState("");
  const [orderItems, setOrderItem] = useState([]);
  const [price, setPurchase] = useState(0);
  const [totalPrice, setTotal] = useState(0);
  const [code, setOrderCoupon] = useState("");

  useEffect(() => {
    // console.log(order_id);
    axios
      .get(`http://localhost:5000/orders/${order_id}`)
      .then((res) => {
        setOrderItem(res.data);
        console.log(res.data);
        let sum = 0;
        res.data.map((orderItem) => {
          sum = sum + orderItem.quantity * orderItem.purchase_price;
        });
        console.log(sum);
        setPurchase(sum);
        setTotal(sum);
      })
      .catch((err) => console.log(err));
  }, [order_id]);

  useEffect(() => {
    axios
      .post(`http://localhost:5000/userOrder`, { id })
      .then((res) => {
        console.log(res.data.id);
        setorder_id(res.data.id);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function deleteorder(id) {
    console.log(id);
    axios
      .post(`http://localhost:5000/deleteOrderItem`, { id })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  ///applyCoupon
  function applyCoupon(e) {
    axios
      .post(`http://localhost:5000/applyCoupon`, { coupon_code })
      .then((res) => {
        //setOrderItem(res.data);
        if (res.data == -1) {
          setPurchase(totalPrice);
          return;
        }

        setOrderCoupon(coupon_code);

        if (res.data.is_relative == 0) {
          if (totalPrice < res.data.discount) {
            setPurchase(1); //mablagh ramzy
          } else setPurchase(totalPrice - res.data.discount);
        } else {
          setPurchase(
            Math.ceil(totalPrice - (res.data.discount * totalPrice) / 100.0)
          );
        }

        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  function changeCouponCode(e) {
    setCode(e.target.value);
  }

  function SubmitOrder(e) {
    if (price == 0) {
      return;
    }

    if (totalPrice == price) {
      setOrderCoupon("");
    }
    axios
      .post(`http://localhost:5000/makeOrder`, { code, order_id, price })
      .then((res) => {
        //setOrderItem(res.data);
        console.log(res.data);
        if (res.data !== "empty cart" || res.data !== "wrong coupon") {
          window.location.href = "/home";
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h2>Checkout</h2>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className="container mt-4">
          <div className="row">
            {orderItems.map((orderItem) => {
              return (
                <div className="col-lg-4 col-md-6 col-12" key={orderItem.id}>
                  <div className="cards">
                    <Card className="course-card">
                      <Card.Img
                        variant="top"
                        src={orderItem.image}
                        class="kadyImage"
                      ></Card.Img>
                      <Card.Body>
                        <Card.Title>{orderItem.title}</Card.Title>
                        <Row>
                          <Col>
                            <Form.Control
                              className="boxx1"
                              aria-label="Default select example"
                              Value={orderItem.quantity}
                              readOnly="readonly"
                            ></Form.Control>
                          </Col>
                          <Col>
                            <p className="bb1">Items X</p>
                          </Col>
                          <Col>
                            <Form.Control
                              className="boxx2"
                              aria-label="Default select example"
                              Value={orderItem.purchase_price}
                              readOnly="readonly"
                            ></Form.Control>
                          </Col>
                          <Col>
                            <p className="bb2">.LE</p>
                          </Col>
                          <Button
                            variant="dark"
                            onClick={() => deleteorder(orderItem.id)}
                            className="n"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              class="bi bi-trash3-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                          </Button>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>{" "}
        </div>
      </Container>
      <Form className="fff mt-5">
        <Form.Group className="ff mt-5" controlId="formBasicEmail">
          <Form.Label>
            <h4 className="hh">Enter Your Coupon here..</h4>
          </Form.Label>
          <Container className="c1">
            <Row>
              <Col>
                <Form.Control
                  className="prom_text11"
                  type="string"
                  maxLength={6}
                  placeholder="Apply coupon"
                  onChange={changeCouponCode}
                />
              </Col>
              <Col>
                <Button variant="dark" onClick={applyCoupon}>
                  Apply
                </Button>
              </Col>
            </Row>
          </Container>
          <p className="hh1 mt-2">
            Your Coupon must not exceed 6 characters/numbers
          </p>
        </Form.Group>
        <h1 className="hh2">Total: </h1>
        <Form.Control
          className="boxx"
          aria-label="Default select example"
          Value={price}
          readOnly="readonly"
        ></Form.Control>
        <Button variant="dark" onClick={SubmitOrder} className="bb">
          Submit Order
        </Button>
      </Form>
    </Fragment>
  );
}

export default Cart;
