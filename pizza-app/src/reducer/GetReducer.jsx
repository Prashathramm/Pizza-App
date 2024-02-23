export const INITIAL_STATE = {
    status: false,
    orderId: '',
    orderDetails: {}
}

export const getReducer = (state, action) => {
    switch(action.type) {
        case "SUCCESS":
            return {
              status: true,
              orderId: '' ,
              orderDetails: action.payload
            }
        
        case "ERROR":
            return {
                status: false,
                orderId:'',
                orderDetails: action.payload
            }
        
        case "SET_INPUT":
            return {
                ...state,
                orderId: action.payload
            }
        default:
            return state;
    }
}