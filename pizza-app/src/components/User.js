import React from 'react'
import '../styles/index.css';
import {useState} from 'react';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const[name, setName] = useState('');
    const[ph, setPh] = useState('');
    const[address, setAddress] = useState('');
    const [cookies, setCookie] = useCookies(['name', 'ph', 'address']);

    const navigate = useNavigate();

    const Handle = (event) => {
        event.preventDefault();
        if(name.length > 0 && ph.length > 0 && address.length > 0) {
            setCookie('name', name, {path: '/'})
            setCookie('ph', ph, {path: '/'})
            setCookie('address', address, {path: '/'})
        
            navigate('/home');
        } else {
            alert("Kindly fill up the credentials");
        }
    }
    
    return (
        <div>
            <h1 className='order-header'>Let us know about you!</h1>
            <div className='user-form'>
                <form onSubmit={Handle}>
                    <label htmlFor="fname">First name:</label><br />
                    <input type="text" id="fname" name="fname" onChange={(event) => setName(event.target.value)}/><br />
                    <label htmlFor="ph">Phone:</label><br />
                    <input type="tel" id="ph" name="ph" onChange={(event) => setPh(event.target.value)}/><br />
                    <label htmlFor="address">Address:</label><br />
                    <input type="text" id="address" name="address" onChange={(event) => setAddress(event.target.value)}/><br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default User
