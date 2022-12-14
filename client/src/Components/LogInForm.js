import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/prom_bg.css'

function LogInForm() {
    return (
        <Fragment>
             <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >Online Book Store</Navbar.Brand>
            </Container>
        </Navbar>
            <Container className="login">
                <Row>
                    <Col>
                        <h2>Log In</h2>
                    </Col>
                
                    <Row>
                    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="dark" type="submit">
        Log In
      </Button>
    </Form>
                    </Row>

                </Row>
            </Container>

        </Fragment>
    )
}

export default LogInForm