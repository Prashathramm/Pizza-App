import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
    available: true
}

export const toggleStateSlice = createSlice({
    name: 'toggleState',
    initialState: INITIAL_STATE,
    reducers: {
        change: (state, action) => {
            state.available = action.payload;
        }
    }
})

export const {change} = toggleStateSlice.actions;
export default toggleStateSlice.reducer;

