import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import '../styles/index.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Homepage = () => {
    const dispatch = useDispatch();

    const obj = useSelector((state) => state.data);

    const map = useSelector((state) => state.cart);

    const [cookies, setCookie, removeCookie] = useCookies(['name', 'ph', 'address']);
    
    const url = "https://react-fast-pizza-api.onrender.com/api/menu";

    const navigate = useNavigate();

    useEffect(() => {
        if(obj.userData.length > 0) {
            for(let id=0;id<obj.userData.length;++id) {
                const item = obj.userData[id];
                if(!item.soldOut) {
                    dispatch({type: 'data/updateDic', payload: {id: item.id, value:10}});
                    dispatch({type: 'data/updateIndex', payload: {id: item.id, value:id}});
                }
            }
        }
        dispatch({type: 'cart/clear', payload: null});
    },[obj.userData])

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            dispatch({type: 'data/getData', payload: response.data.data});
        })
        .catch((error) => {
            dispatch({type: 'data/getData', payload: error.name});
        })
    },[])

    useEffect(() => {
        if(cookies.name === undefined || cookies.ph === undefined || cookies.address === undefined) {
            navigate('/');
        }
    },[cookies.name, cookies.ph, cookies.address])

    console.log(cookies.name+" "+cookies.ph+" "+cookies.address);

    const handleClick = () => {
        navigate('/order');
        window.scrollTo(0, 0);
      };

    const getOrder =() => {
        navigate('/getorder');
        window.scrollTo(0, 0);
    }

    const signoff = () => {
        removeCookie('name');
        removeCookie('ph');
        removeCookie('address');
        navigate('/');
    }

    return (
        <div>
            <div className="heading">
                <h1>- FAST REACT PIZZA CO. -</h1>
                <h2>OUR MENU</h2>
            </div>
            <div className="items-list">
                {obj.userData.map((item,id) => (
                    <div className="item"key={id}>
                        <img src={item.imageUrl}/>
                        <div className="items-list-data">
                            <h3>{item.name}</h3>
                            {item.ingredients.map((ingredient,index) => (
                                <div key={index}>{ingredient}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="btn">
                <button onClick={handleClick}>Order
                </button>
            </div>
            <div className="btn">
                <button onClick={getOrder}>Get Order
                </button>
            </div>
            <div className="btn">
                <button onClick={signoff}>Logout
                </button>
            </div>
        </div>
    )
}

export default Homepage