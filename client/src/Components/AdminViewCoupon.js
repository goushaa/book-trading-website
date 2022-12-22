import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

function AdminViewCoupon() {
    let { code } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/coupons/${code}`).then((res) => {
            console.log(res.data);
            setCoupon(res.data);
        }).catch(err => console.log(err));
    }, [])

    const [coupon, setCoupon] = useState({})
    return (
        <div>
            <ul>
                <li>{coupon.code}</li>
                <li>{coupon.discount}</li>
                <li>{coupon.maximum_use}</li>
                <li>{coupon.is_relative}</li>
            </ul>
        </div>
    )
}

export default AdminViewCoupon