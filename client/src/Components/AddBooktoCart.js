import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../CSS/prom_bg.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function AddBooktoCart() {
    const { id, book_id } = useParams();
    const [image, setImage] = useState('');
    const [title, settitle] = useState('');
    const [author_name, setauthor_name] = useState('');
    const [purchase_price, setpurchase_price] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setQuantityCounter] = useState(1);
    const [readbooksquantity, setQuantity] = useState(0);
    const [order_id, setORDERID] = useState(0);
    const [genre_id, setGenreId] = useState('');
    const [version, setVersion] = useState('');
    const [isbn, setIsbn] = useState('');
    const [langId, setLanguageId] = useState('');
    const [genre, setGenreName] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:5000/bookinfo/${book_id}`).then((res) => {
            setImage(res.data.image)
            settitle(res.data.title)
            setauthor_name(res.data.author_name)
            setpurchase_price(res.data.purchase_price)
            setdescription(res.data.description)
            setQuantity(res.data.count)
            setGenreId(res.data.genre_id)
            setVersion(res.data.version)
            setIsbn(res.data.isbn)
            setLanguageId(res.data.language_id)
            console.log(res.data);
            console.log(genre_id);
        }).catch((err) => console.log(err));
        
        axios.get(`http://localhost:5000/genrenamefromgenreid/${genre_id}`).then((res) => {
            console.log(res.data);
            setGenreName(res.data);
        }).catch(err => console.log(err));
    }, []);

    function increment(e) {
        if (quantity < readbooksquantity) {
            setQuantityCounter(quantity + 1);
        }


    }
    function decrement(e) {
        if (quantity > 1) {
            setQuantityCounter(quantity - 1);
        }

    }

    function addToCart(e) {

        axios.post(`http://localhost:5000/bookinfo/quantity`, { book_id }).then((res) => {
            if (quantity > res.data.count || res.data.status == 1) {
                //https://getbootstrap.com/docs/4.0/components/alerts/
                return;
            }

        }).catch((err) => console.log(err));
        ///userOrder
        let user_id = id
        axios.post(`http://localhost:5000/userOrder`, { user_id }).then((res) => {
            setORDERID(res.data.id);
        }).catch((err) => console.log(err));

        //don't add same book_id to order more than once (book already in order to add/decrease number of books go to your cart page)

        axios.post(`http://localhost:5000/addToCart`, { book_id, order_id, quantity }).then((res) => {
            console.log(res.data);
        }).catch((err) => console.log(err));

    }

    return (
       <Fragment>
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h3>Online Book Store</h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Row>
            <Col>
            <Container class="col-sm mt-3">
                        <img src={image} />
                    </Container>
            </Col>

            <Col className="col-sm mt-3">
            <Container >
                        <h1>{title}</h1>
                        
                    </Container>
                    <Row>
                    <Container>Price: {purchase_price} L.E</Container>
                    </Row>
                    <Row>
                    <Container>Author:{author_name}</Container>
                    </Row>
                    <Row>
                    <Container>genre:{genre}</Container>
                    </Row>
                    <Row>
                    <Container>Version:{version}</Container>
                    </Row>
                    <Row>
                    <Container>ISBN:{isbn}</Container>
                    </Row>
                    <Row>
                    <Container>Description: {description}</Container>
                    </Row>
                    <Container className="quantity">
                        <Row><h6>Quantity</h6></Row>
                
                <Row> 
                    <Col className='col-3'>
                    <Form.Control className=" box mt-1 w-25" type="text" Value={quantity} disabled />
                    </Col>
                    <Col className='btnss'>
                    <button type="button" onClick={increment} class="btn btn-dark">+</button>
                    <button type="button" onClick={decrement} class="btn btn-secondary">-</button>
                    </Col>
                   
                        </Row>
                        <Row>
                        <Button className='mt-2' variant='success' onClick={addToCart} class="btn btn-success w-75">Add To Cart</Button>
                        </Row>
                        
                    </Container>
            </Col>
        </Row>
       </Fragment>
    )
}

export default AddBooktoCart;