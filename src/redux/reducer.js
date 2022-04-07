import * as types from "./actionType";

const initialState = {
    shipments: [],
    shipment: {},
    loading: false

};

const shipmentsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SHIPMENTS:
            return { 
                ...state,
                shipments: action.payload,
                loading: false
            };
        case types.DELETE_SHIPMENT:
        case types.ADD_SHIPMENT:
        case types.UPDATE_SHIPMENT:
            return {
                ...state,
                loading: false 
            }; 
        case types.GET_SINGLE_SHIPMENT:
            return {
                ...state,
                shipment: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default shipmentsReducers;