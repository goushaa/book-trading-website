import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Card, Button, Form, Container, Col } from 'react-bootstrap'


function Cart() {
    const { id, order_id } = useParams()

    console.log(id, order_id);
    const [orderItems, setOrderItem] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${order_id}`).then((res) => {
            setOrderItem(res.data);
        }).catch((err) => console.log(err));

    }, []);
    return (
        <div>
            <Container>
                {
                    orderItems.map(orderItem => {
                        return (
                            <div className="cards">
                                <div className="col-2">
                                    <Card className="course-card">
                                        <Card.Img variant="top" src={orderItem.image}></Card.Img>
                                        <Card.Body>
                                            <Card.Title>{orderItem.title}</Card.Title>
                                            {orderItem.quantity}

                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        )
                    })
                }
            </Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                        <h5>Enter Your Coupon here..</h5>
                    </Form.Label>
                    <Container className="c1">
                        <Row>
                            <Col>
                                <Form.Control
                                    className="prom_text"
                                    type="string"
                                    maxLength={6}
                                    placeholder="Apply coupon"
                                />
                            </Col>
                            <Col>
                                <Button variant="dark" type="submit">
                                    Apply
                                </Button>
                            </Col>


                        </Row>

                    </Container>
                    <Form.Text className="text-muted">
                        Your Coupon must not exceed 6 characters/numbers
                    </Form.Text>


                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit Order
                </Button>


            </Form>
        </div>
    )
}

export default Cart