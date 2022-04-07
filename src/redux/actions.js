import * as types from "./actionType";
import axios from "axios";

const getShipments = (shipments) => ({
    type: types.GET_SHIPMENTS,
    payload: shipments,
});
 
const shipmentDeleted = () => ({
    type: types.DELETE_SHIPMENT

});

const shipmentAdded = () => ({
    type: types.ADD_SHIPMENT

});

const getShipment = (shipment) => ({
    type: types.GET_SINGLE_SHIPMENT,
    payload: shipment,
});

const shipmentUpdated = () => ({
    type: types.UPDATE_SHIPMENT,
});

export const loadShipments = () => {
    return function (dispatch) {
        axios
            .get(`${process.env.REACT_APP_API}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getShipments(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

export const deleteShipment = (id) => {
    return function (dispatch) {
        axios
            .delete(`${process.env.REACT_APP_API}/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(shipmentDeleted());
                dispatch(loadShipments());
            })
            .catch((error) => console.log(error));
    };
};

export const addShipment = (shipment) => {
    return function (dispatch) {
        axios
            .post(`${process.env.REACT_APP_API}`, shipment)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(shipmentAdded());
                dispatch(loadShipments());
            })
            .catch((error) => console.log(error));
    };
};

export const getSingleShipment = (id) => {
    return function (dispatch) {
        axios
            .get(`${process.env.REACT_APP_API}/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getShipment(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

export const updateShipment = (shipment, id) => {
    return function (dispatch) {
        axios
            .put(`${process.env.REACT_APP_API}/${id}`, shipment)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(shipmentUpdated());
            })
            .catch((error) => console.log(error));
    };
};