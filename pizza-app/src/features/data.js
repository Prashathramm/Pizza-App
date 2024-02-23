import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE = {
    userData : [],
    dic : {},
    index : {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState: INITIAL_STATE,
    reducers: {
        getData: (state, action) => {
            state.userData = action.payload;
        },
        updateDic: (state, action) => {
            const {id, value} = action.payload;
            state.dic[id] = value;
        },
        updateIndex: (state,action) => {
            const {id, value} = action.payload;
            state.index[id] = value;
        },
        initial: (state, action) => {
            state.dic= {};
            state.index= {}
        }, 
        clearDic: (state, action) => {
            state.dic= {};
        }

    }
})

export const {getData, updateDic, updateIndex, initial, clearDic} = dataSlice.actions;
export default dataSlice.reducer
