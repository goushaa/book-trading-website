import React from 'react'
import { useParams } from 'react-router-dom'

function AddBooktoCart() {
    const { id, book_id } = useParams();
    console.log(id, book_id);
    return (
        <div>AddBooktoCart</div>
    )
}

export default AddBooktoCart