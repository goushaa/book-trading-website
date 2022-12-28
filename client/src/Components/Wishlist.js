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
  let { user_id } = useParams()
  const [wishlists, setWishLists] = useState([]);
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  useEffect(() => {
    axios
      .get(`http://localhost:5000/wishlists/${user_id}`)
      .then((res) => {
        setWishLists(res.data)
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
function deletewishlist(book_id)
{
  axios
      .post(`http://localhost:5000/deleteWishlist/${user_id}`,{book_id})
      .then((res) => {
        
      })
      .catch((err) => console.log(err));
}
  return (
    <Fragment>
      <Container className="Store_bg">
      {
            wishlists.map(wishlist => {
              return (
                <div className="col-lg-4 col-md-6 col-12">
                  <div>
                    <Card className="course-card">
                      <Card.Img variant="top" src={wishlist.image} class="kadyImage" ></Card.Img>
                      <Card.Body>
                        <Card.Title>{wishlist.title}</Card.Title>
                        <p>{wishlist.description}</p>
                        <div>
                         <Link>
                         <Button variant="success" className="ml-3" onClick={deletewishlist(wishlist.book_id)} > Delete</Button>
                         </Link>
                        </div>

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