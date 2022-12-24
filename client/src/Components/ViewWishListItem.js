import React from 'react'
import { useParams } from 'react-router-dom'

function ViewWishListItem() {
    let { book_id, id } = useParams();
    console.log(id, book_id);
    return (
        <div>ViewWishListItem</div>
    )
}

export default ViewWishListItem