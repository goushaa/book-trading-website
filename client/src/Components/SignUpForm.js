import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/prom_bg.css'

function SignUpForm() {
    return (
        <Fragment>
             <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >Online Book Store</Navbar.Brand>
            </Container>
        </Navbar>
            <Container className="signup">
                <Row>
                    <Col>
                        <h1>Create Your Account</h1>
                        <p>Join us!</p>
                    </Col>
                
                    <Col>
                        <Form>
                            <Form.Label><h2>Sign Up</h2></Form.Label>
                            <Form.Group className="mb-3" controlId="Email">

                                <Form.Control type="email" placeholder="Email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Password">

                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Confirm Password">

                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Fname">

                                <Form.Control type="text" placeholder="First Name" />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Lname">

                            <Form.Control type="text" placeholder="Last Name" />
                            
                            </Form.Group>
    <Form.Select className="city mt-3" aria-label="Default select example">
      <option>Select your City</option>
      <option value="1">Giza</option>
      <option value="2">Cairo</option>
      <option value="3">Alexandria</option>
    </Form.Select>

    <Form.Select className="type mt-3 mb-3" aria-label="Default select example">
      <option>Select your Type</option>
      <option value="1">Customer</option>
      <option value="2">Store</option>
      <option value="3">Driver</option>
    </Form.Select>
                            <Button className variant="dark" type="submit"> Sign up </Button>
                        </Form>
                    </Col>

                </Row>
            </Container>

        </Fragment>
    )
}

export default SignUpForm