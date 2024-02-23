import React, { useEffect, useState} from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import '../styles/index.css';

const Order = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const obj = useSelector((state) => state.data);

    const map = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        if(obj.userData.length > 0 && Object.keys(map.map).length < 1) {
            for(let id=0;id<obj.userData.length;++id) {
                const item = obj.userData[id];
                if(!item.soldOut) {
                    dispatch({type: 'data/updateDic', payload: {id: item.id, value:10}});
                    dispatch({type: 'data/updateIndex', payload: {id: item.id, value:id}});
                }
            }
        }
    },[obj.userData])

    const AddItem = (id) => {
        dispatch({type: 'data/updateDic', payload: {id: id, value: obj.dic[id]-1}});
        if(map.map[id]!=null) {
            dispatch({type: 'cart/add', payload: {id: id, val: parseInt(map.map[id]) + 1}});
        } else {
            dispatch({type: 'cart/add', payload: {id: id, val: 1}});
        }
    }

    const RemoveItem =(id) => {
        dispatch({type: 'data/updateDic', payload: {id: id, value: obj.dic[id]+1}});
        let value = parseInt(map.map[id]);
        if(value > 1) {
            dispatch({type: 'cart/add', payload: {id: id, val: value - 1}});
        } else {
            dispatch({type: 'cart/remove', payload: id});
        }
    }

    const HandleClick=() => {
        navigate('/confirmorder');
    }

    const handleClickToHomePage = () => {
        if(Object.keys(map.map).length < 1) {
            dispatch({type: 'toggleState/change', payload: false})
        } else {
            dispatch({type: 'toggleState/change', payload: true})
        }
        navigate('/home');
    }

    return (
        <div>
            {console.log(obj.dic)};
            <h1 className='order-header'>Available items</h1>
            <div className='order-item-list'>
                {obj.userData.map((item,id) => (
                    !item.soldOut && 
                    <div key={id}>
                        <div className='order-item-outer'>
                            <div>
                                <img src={item.imageUrl}/>
                            </div>
                              <div>
                                <h3>{item.name}</h3>
                            </div>
                            <div>
                                <h4>Quantity: {obj.dic[item.id]}</h4>
                            </div>
                            <div className='order-item-btn'>
                                {obj.dic[item.id] > 0 && <button onClick={() => AddItem(item.id)}>Add</button>}
                                {obj.dic[item.id] < 10 && <button onClick={() => RemoveItem(item.id)}>Remove</button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='btn'>
                <button onClick={HandleClick}>Proceed</button>
            </div>
            <div className="btn">
                <button onClick={handleClickToHomePage}>Back to Homepage
                </button>
            </div>
        </div>
    )
}

export default Order
