import React, { Fragment } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../CSS/prom_bg.css'

function AdminForm() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
    return (
        <Fragment >
       

               <Navbar  bg="dark" variant="dark" expand="lg">
      <Container >
        <Navbar.Brand href="/"><h3>Admin</h3></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Item> 
            <Button variant='light' className='addcoupon_btn' onClick={handleShow}> Add New Coupon </Button>
          </Nav.Item>
          <Nav.Link href="/pendingRequests">View Pending Requests</Nav.Link>
          
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar> 
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h4>Add New Coupon</h4></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Container className="AddCoupon">
                    <Row>
                    <Form>
      <Form.Group className="mb-3 " controlId="couponform">
        <Form.Control className='form-control w-75' type="string" maxLength={6} placeholder="Enter Coupon" />
      </Form.Group>
      <Button variant="dark" type="submit">
        Add
      </Button>
      
    </Form>
                    </Row>

            </Container>
        </Offcanvas.Body>
      </Offcanvas>
    <Container className='Admin_bg'>
   
    <Tabs
      defaultActiveKey="Customers"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="Customers" title="Customers">
     
    
      </Tab>
      <Tab eventKey="Stores" title="Stores">

      </Tab>
      <Tab eventKey="Drivers" title="Drivers">
       
      </Tab>
    </Tabs>
           
            </Container>
        </Fragment>
    )
}

export default AdminForm