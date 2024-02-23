import {configureStore} from '@reduxjs/toolkit';
import dataReducer from '../features/data';
import toggleStateReducer from '../features/toggleState';
import cartReducer from '../features/cart'

const store = configureStore({
    reducer: {
        data: dataReducer,
        toggleState: toggleStateReducer,
        cart: cartReducer
    }
})

export default store;