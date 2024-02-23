import {createSlice} from '@reduxjs/toolkit';

const INITIAL_VALUE = {
    map: {}
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_VALUE,
    reducers: {
        add: (state, action) => {
            const{id, val}= action.payload;
            state.map[id] = val;
        },

        remove: (state, action) => {
            delete state.map[action.payload];
        },

        clear: (state, action) => { 
            state.map = {};
        }
    }
})


export const {add, remove, clear} = cartSlice.actions;
export default cartSlice.reducer;