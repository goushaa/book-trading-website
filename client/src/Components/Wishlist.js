import React, { Fragment, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/prom_bg.css'
import { useParams } from 'react-router-dom';
import { Row, Tab, Tabs, Col } from 'react-bootstrap';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';


function Wishlist() {
  let { id } = useParams()
  console.log(id);

  const [wishlists, setWishLists] = useState([]);
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  useEffect(() => {
    axios
      .get(`http://localhost:5000/wishlists/${id}`)
      .then((res) => {
        console.log(res.data);
        setWishLists(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <Container className="Store_bg">
        {
          wishlists.map(wishlist => {
            let book_id = wishlist.book_id
            axios.post('http://localhost:5000/bookinfo', { book_id }).then(res => {
              setImage(res.data.image)
              setTitle(res.data.title)
            }).catch(err => console.log(err));
            return (
              <div className="col-lg-4 col-md-6 col-12">
                <div>
                  <Card className="course-card">
                    <Card.Img variant="top" src="https://i.ibb.co/Xt27d9k/Among-Us-Screenshot-2020-09-20-01-12-35.jpg"></Card.Img>
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <p>{wishlist.book_id}</p>
                      <Row>
                        <Col><Button variant="dark" onClick={function (e) {
                          let user_id = wishlist.user_id
                          let book_id = wishlist.book_id
                          axios.post(`http://localhost:5000/deleteWishlist/${user_id}`, { book_id }).then(res => {
                            window.location.reload();
                          }).catch(err => console.log(err));
                        }}> Delete Wishlist</Button></Col>
                        <Col><Link to={`${wishlist.book_id}`} ><Button variant="dark" > View</Button></Link></Col>
                      </Row>




                    </Card.Body>
                  </Card>
                </div>
              </div>
            )
          })
        }
      </Container>


    </Fragment>
  )
}

export default Wishlist