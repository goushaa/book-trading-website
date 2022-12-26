import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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

    useEffect(() => {
        axios.get(`http://localhost:5000/bookinfo/${book_id}`).then((res) => {
            setImage(res.data.image)
            settitle(res.data.title)
            setauthor_name(res.data.author_name)
            setpurchase_price(res.data.purchase_price)
            setdescription(res.data.description)
            setQuantity(res.data.count)
        }).catch((err) => console.log(err));

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

            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <img src={image} />
                    </div>
                    <div class="col-sm">
                        <h1>{title}</h1>
                        <h1>{author_name}</h1>
                        <h1>{purchase_price}</h1>
                        <h1>{description}</h1>
                    </div>
                    <div class="col-sm">
                        {quantity}
                        <button type="button" onClick={increment} class="btn btn-primary">+</button>
                        <button type="button" onClick={decrement} class="btn btn-danger">-</button>
                        <h1>ADD TO CART</h1>
                        <button type="button" onClick={addToCart} class="btn btn-primary">ADD</button>

                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default AddBooktoCart;