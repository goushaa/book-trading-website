import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

function AdminViewUser() {

    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`).then((res) => {
            setUser(res.data);
        }).catch(err => console.log(err));
    }, [])

    const [user, setUser] = useState({})

    return (
        <div>
            {
                <ul>
                    <li>{user.id}</li>
                    <li>{user.first_name}</li>
                    <li>{user.last_name}</li>
                    <li>{user.address}</li>
                    <li>{user.city_id}</li>
                    <li>{user.user_name}</li>
                    <li>{user.email}</li>
                    <li>{user.password}</li>
                </ul>
            }
        </div>
    )
}

export default AdminViewUser