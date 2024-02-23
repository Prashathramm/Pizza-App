import React from 'react'
import { useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.css';

const ViewOrder = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const map = useSelector((state) => state.cart);

    const message = location.state.message;

    const orderDetails = location.state.orderDetails;

    useEffect(() => {
        if(message === 201 && Object.keys(map.map).length > 0) {
            toast.success("Order Created Successfully !");
            dispatch({type: 'cart/clear', payload: null})
            dispatch({type: 'data/clearDic', payload: null})
        } else if(Object.keys(map.map).length < 1) {
            toast.info("Order already placed");
        }
    },[])

    const handleClickToHomePage = () => {
        navigate('/home', {replace: true});
    }

    return (
        <div>
            {<div>
                <h1 className='order-header'>Your Order is Ready</h1>
                <div className='order-info'>
                    <div> 
                        <h2>Order Information</h2>
                        <div className='info'>
                            <p><b>Order ID: </b>{orderDetails.id}</p>
                            <p><b>Created at: </b>{orderDetails.createdAt}</p>
                            <p><b>Estimated Delivery: </b>{orderDetails.estimatedDelivery}</p>
                            <p><b>Price: </b>{orderDetails.orderPrice}</p>
                            <p><b>Status: </b>{orderDetails.status}</p>
                        </div>
                    </div>
                    <div>
                        <h2>Account Information</h2>
                        <div className='info'>
                            <p><b>Customer Name: </b>{orderDetails.customer}</p>
                            <p><b>Phone: </b>{orderDetails.phone}</p>
                            <p><b>Address: </b>{orderDetails.address}</p>
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
                            {orderDetails.cart.map((item,index) => (
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
            <ToastContainer />
        </div>
    )
}

export default ViewOrder
