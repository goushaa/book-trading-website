import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

function AdminViewStore() {

    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/stores/${id}`).then((res) => {
            setStore(res.data);
        }).catch(err => console.log(err));
    }, [])

    const [store, setStore] = useState({})
    return (
        <div>
            {
                <ul>
                    <li>{store.id}</li>
                    <li>{store.first_name}</li>
                    <li>{store.last_name}</li>
                    <li>{store.address}</li>
                    <li>{store.city_id}</li>
                    <li>{store.user_name}</li>
                    <li>{store.email}</li>
                    <li>{store.password}</li>
                </ul>
            }
        </div>
    )
}

export default AdminViewStore