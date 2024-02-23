import React from 'react'
import axios from 'axios';
import { useReducer } from 'react';
import '../styles/index.css';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STATE, getReducer } from '../reducer/GetReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetOrder = () => {

    let url = "https://react-fast-pizza-api.onrender.com/api/order/";

    const navigate = useNavigate();

    const [state, dispatch] = useReducer(getReducer, INITIAL_STATE);

    const Get =(event) => {
        dispatch({type: "SET_INPUT", payload: event.target.value});
    }

    const handleClickToHomePage = () => {
        navigate('/home');
    }

    const GetOrder =() => {
        url = url + state.orderId;  
        axios.get(url)
        .then((response) => {
            toast.success("Order fetched success !");
            dispatch({type: "SUCCESS", payload: response.data.data});
        })
        .catch((error) => {
            toast.error("Invalid Order Id");
            dispatch({type: "ERROR", payload: error.name});
        })
    }

    return (
    <div>
        <div className='fetch-order'>
            <h3>Enter your Order ID:</h3>
            <input type="text" value={state.orderId} onChange={Get}></input>
            <button onClick={GetOrder}>Submit</button>
        </div>
        {state.status && <div>
            <h1 className='order-header'>Your Order Details</h1>
            <div className='order-info'>
                <div> 
                    <h2>Order Information</h2>
                    <div className='info'>
                        <p><b>Order ID: </b>{state.orderDetails.id}</p>
                        <p><b>Created at: </b>{state.orderDetails.createdAt}</p>
                        <p><b>Estimated Delivery: </b>{state.orderDetails.estimatedDelivery}</p>
                        <p><b>Price: </b>{state.orderDetails.orderPrice}</p>
                        <p><b>Status: </b>{state.orderDetails.status}</p>
                    </div>
                </div>
                <div>
                    <h2>Account Information</h2>
                    <div className='info'>
                        <p><b>Customer Name: </b>{state.orderDetails.customer}</p>  
                    </div>
                </div>
            </div>
            <div className='items-info'>
                <h2>Ordered Items</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.orderDetails.cart.map((item,index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.unitPrice}</td>
                                <td>${item.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>}
        <div className="btn1">
            <button onClick={handleClickToHomePage}>Back to Homepage
            </button>
        </div>
        <ToastContainer/>
    </div>
    )
}

export default GetOrder
