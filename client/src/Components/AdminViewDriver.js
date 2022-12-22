import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

function AdminViewDriver() {
    let { ssn } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/drivers/${ssn}`).then((res) => {
            setDriver(res.data);
        }).catch(err => console.log(err));
    }, [])
    const [driver, setDriver] = useState({})
    return (
        <div>
            <ul>
                <li>{driver.id}</li>
                <li>{driver.first_name}</li>
                <li>{driver.last_name}</li>
                <li>{driver.address}</li>
                <li>{driver.city_id}</li>
                <li>{driver.user_name}</li>
                <li>{driver.email}</li>
                <li>{driver.password}</li>
                <li>{driver.ssn}</li>
                <li>{driver.bike_license}</li>
                <li>{driver.driver_license}</li>
                <li>{driver.expiration_date}</li>
            </ul>
        </div>
    )
}

export default AdminViewDriver