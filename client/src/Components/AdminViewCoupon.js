import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../CSS/Style.css";

function AdminViewCoupon() {
  let { code } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/coupons/${code}`)
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [coupon, setCoupon] = useState({});
  return (
    // <div>
    //     <ul>
    //         <li>{coupon.code}</li>
    //         <li>{coupon.discount}</li>
    //         <li>{coupon.maximum_use}</li>
    //         <li>{coupon.is_relative}</li>
    //     </ul>
    // </div>
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <h3>Coupon Info</h3>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="uname"></Container>
      <Container className="mt-0 mb-3  w-25">
        <div className="box1text">Code</div>
        <Form.Control
          className=" box1 mt-1 mb-3"
          type="text"
          defaultValue={coupon.code}
          readOnly="readonly"
        />
        <div className="box2text">Discount</div>
        <Form.Control
          className=" box2 mt-1 mb-3"
          type="text"
          defaultValue={coupon.discount}
          readOnly="readonly"
        />
        <div className="box3text">Maximum Use</div>
        <Form.Control
          className=" box3 mt-1 mb-3"
          type="text"
          defaultValue={coupon.maximum_use}
          readOnly="readonly"
        />
        <div className="box4text">Is Relative</div>
        <Form.Control
          className=" box4 mt-1 mb-3"
          type="text"
          defaultValue={coupon.is_relative}
          readOnly="readonly"
        />
      </Container>
    </Fragment>
  );
}

export default AdminViewCoupon;
