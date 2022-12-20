import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Combobox from "react-widgets/Combobox";

function TestAddbook() {

    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [cities, setCities] = useState([]); //should be used in other page (wrote in here for practice)
    console.log(cities); //should be used in other page (wrote in here for practice)
    //title, genre_id, isbn, author_name, language_id, purshace_price, version, description, image, user_id, count
    const [title, setTitle] = useState('');
    const [genre_id, setGenre] = useState('');
    const [isbn, setISBN] = useState('');
    const [author_name, setAuthor] = useState('');
    const [language_id, setLanguage] = useState('');
    const [purshace_price, setPrice] = useState('');
    const [version, setVersion] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    useEffect(() => {
        axios.get('http://localhost:5000/genres').then((res) => {
            setGenres(res.data);
        }).catch(err => console.log(err));
        axios.get('http://localhost:5000/languages').then((res) => {
            setLanguages(res.data);
        }).catch(err => console.log(err));
        //should be used in other page (wrote in here for practice)
        axios.get('http://localhost:5000/cities').then((res) => {
            setCities(res.data);
        }).catch(err => console.log(err));
    }, [])

    function changeTitle(e) {
        setTitle(e.target.value);
    }

    function changeAuthor(e) {

        setAuthor(e.target.value);
    }

    function changePrice(e) {

        setPrice(e.target.value);
    }

    function changeVersion(e) {
        setVersion(e.target.value);
    }

    function changeGenre(e) {
        setGenre(e.target.value);
    }

    function changeLanguage(e) {
        setLanguage(e.target.value);
    }

    function changeISBN(e) {
        setISBN(e.target.value);
    }

    function changeDescription(e) {
        setDescription(e.target.value);
    }

    function changeURL(e) {
        setImage(e.target.value);
    }



    return (
        <div>

            <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" onChange={changeTitle} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" onChange={changeDescription} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Author Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter author name" onChange={changeAuthor} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="purchaseClear">
                    <Form.Label>Purchase Price</Form.Label>
                    <Form.Control type="number" min="0" placeholder="Enter the price this book will be sold at" onChange={changePrice} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Book Version</Form.Label>
                    <Form.Control type="number" min="0" placeholder="Enter book version" onChange={changeVersion} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={changeGenre}>
                    <Form.Label>Genre</Form.Label>
                    <select className='form-control'>
                        {
                            genres.map(genre => (
                                <option key={genre.id}>{genre.name} </option>
                            ))
                        }
                    </select>


                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={changeLanguage}>
                    <Form.Label>Language</Form.Label>
                    <select className='form-control'>
                        {
                            languages.map(language => (
                                <option key={language.id}>{language.name} </option>
                            ))
                        }
                    </select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={changeISBN}>
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" placeholder="Enter book isbn" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={changeURL}>
                    <Form.Label>Book Image</Form.Label>
                    <Form.Control type="file" placeholder="Enter Image" />
                </Form.Group>

                <Button variant="dark" >
                    Add Book
                </Button>
            </Form>
        </div >
    )
}

export default TestAddbook