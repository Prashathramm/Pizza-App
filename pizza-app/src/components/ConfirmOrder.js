import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import '../styles/index.css';
import {useCookies} from 'react-cookie';

const ConfirmOrder = () => {
    const POST_URL = "https://react-fast-pizza-api.onrender.com/api/order";

    const obj = useSelector((state) => state.data);

    const state = useSelector((state) => state.toggleState);

    const map = useSelector((state) => state.cart);

    const [cookies] = useCookies(['name', 'ph', 'address']);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(Object.keys(map.map).length < 1) {
            dispatch({type: 'toggleState/change', payload: false});
        } else {
            dispatch({type: 'toggleState/change', payload: true});
        }
    },[Object.keys(map.map).length]);

    const HandleCart =() => {
        const orders = []

        for(const key in map.map) {
            const id = parseInt(key),quantity = map.map[key],ind = obj.index[id];
            
            const itemInfo = {
                "pizzaId":id,
                "name":obj.userData[ind].name,
                "quantity":quantity,
                "unitPrice":obj.userData[ind].unitPrice,
                "totalPrice":obj.userData[ind].unitPrice*quantity
            };
            orders.push(itemInfo);
        }

        const orderData = {
            "customer":cookies.name,
            "phone": cookies.ph,
            "address":cookies.address,
            "cart":orders
        }

        PostOrder(orderData);
    }

    const PostOrder = (orderData) => {
        axios.post(POST_URL,orderData)
        .then((response) => {
            navigate('/vieworder', {state : { message: response.status, orderDetails: response.data.data}, replace: true})
            
        })
        .catch((error) => {
            navigate('/vieworder', {state : { message: error.name }})
         })
    }

    const RemoveItem =(id) => {
        dispatch({type: 'data/updateDic', payload: {id: id, value: 10}})
        dispatch({type: 'cart/remove', payload: id})
    }

    const HandleQuantity =(id,event) => {
        dispatch({type: 'data/updateDic', payload: {id: id, value: 10-parseInt(event.target.value)}})
        dispatch({type: 'cart/add', payload: {id: id, val: parseInt(event.target.value)}})
    }

    const BackToOrder =() => {
        navigate('/order');
    }

    return (
    <div>
        {!state.available && <div>
            <h1 className='order-header'>Order something !</h1>
            <div className="btn">
                <button onClick={BackToOrder}>Back to Order
                </button>
            </div>
        </div>}
        {state.available && <div>
            <h1 className='order-header'>Your Order is here</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(map.map).map(([key, value]) => {
                        let id = key,quantity = value,ind = obj.index[id];
                        return (
                            <tr key={key}>
                                <td>{obj.userData[ind].name}</td>
                                <td>
                                    <select value={value} onChange={(event) => {HandleQuantity(id,event)}}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                    </select>
                                </td>
                                <td>${obj.userData[ind].unitPrice}</td>
                                <td>${obj.userData[ind].unitPrice*value}</td>
                                <td><button onClick={() => {RemoveItem(id)}}>Remove</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="btn">
                <button onClick={HandleCart}>Confirm Order
                </button>
            </div>
            <div className='btn'>
                <button onClick={BackToOrder}>Back To Order
                </button>
            </div>
        </div>}
    </div>
    )
}

export default ConfirmOrder
