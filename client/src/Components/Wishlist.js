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
import Nav from "react-bootstrap/Nav";

function Wishlist() {
  if(localStorage.length==0)
  window.location.href = "/";
  const userData = JSON.parse(localStorage.getItem("user"));
  if(userData.type==1||userData.type==0)
  window.location.href = "/login";
  const [user_id,setID] =useState(userData.id) ;
  const [wishlists, setWishLists] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/wishlists/${user_id}`)
      .then((res) => {
        setWishLists(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
function deletewishlist(book_id)
{
  console.log(user_id);
  console.log(book_id);
  axios
      .post(`http://localhost:5000/deleteWishlist`,{user_id,book_id})
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
    }
    function viewBook (book_id){
      window.location.href="/home/wishlists/"+book_id;
    }
     
  return (
    <Fragment>
      
      <Navbar bg="dark" variant="dark" expand="lg" className="nav">
            <Container fluid>
              <Navbar.Brand className="title" href="/">
                <h3>Online Book Store</h3>
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
      <Container className="Store_bg">
      
               <table class="table">
               <thead class="thead-dark">
                 <tr>
                   <th scope="col">Book</th>
                   <th scope="col">View</th>
                   <th scope="col">Delete</th>
                 </tr>
               </thead>
               <tbody>
                 {wishlists.map((wishlist) => (
                   <tr key={wishlist.book_id}>
                     <td>
                       {wishlist.title}
                     </td>
                     <td>
                   
                     <Button onClick={()=>viewBook(wishlist.book_id)} variant='success' >View</Button>
                     </td>
                     <td>
                     <Button variant='success' onClick={()=>deletewishlist(wishlist.book_id)}>Delete</Button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
      </Container>


    </Fragment>
  )
}

export default Wishlist