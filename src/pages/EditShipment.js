import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { updateShipment } from "../redux/actions";
import { getSingleShipment } from "../redux/actions";



const EditShipment = () => {

    const [state,setState] = useState({
        orderNo: "",
        date: "",
        customer: "",
        trackingNo: "",
        status: "",
        consignee: "",
    });

    const [error, setError] = useState("");

    let {id} = useParams();
    let history = useHistory();
    const {shipment} = useSelector(state => state.data);
    let dispatch = useDispatch();

    const {orderNo,date,customer,trackingNo,status,consignee} = state;

    useEffect(() => {
        dispatch(getSingleShipment(id))
    }, []);

    useEffect(() => {
        if(shipment){
            setState({...shipment})
        }
    }, [shipment]);

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!orderNo || !date || !customer || !trackingNo || !status || !consignee){
            setError("Please fill data");
        } else {
            dispatch(updateShipment(state, id));
            history.push("/");
            setError("");
        }
    };

    return( 
    <div>
        <Button   variant="contained" 
            style={{marginTop:"10px", marginBottom: "10px"}}
            color="error" 
            onClick={() => history.push("/")}>
            Go Back
        </Button>
        <h2>Edit Shipment</h2>
        {error && <h3 style={{color:"red"}}>{error}</h3>}
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& > :not(style)': { m: 1, width: '45ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      id="outlined-basic" 
      label="orderNo" 
      variant="outlined" 
      value={orderNo} 
      name="orderNo"
      type="text"
      onChange={handleInputChange}/>
      <br/>

      <TextField id="outlined-basic" variant="outlined" 
      value={date || ""} name="date" type="text"
      onChange={handleInputChange}/>
      <br/>

      <TextField id="outlined-basic" label="customer" 
      variant="outlined" value={customer || ""} name="customer" type="text"
      onChange={handleInputChange}/>
      <br/>

      <TextField id="outlined-basic" label="trackingNo"
       variant="outlined" value={trackingNo || ""} name="trackingNo" type="text"
       onChange={handleInputChange}/>
      <br/>

      <TextField id="outlined-basic" label="status" 
      variant="outlined" value={status || ""} name="status" type="text"
      onChange={handleInputChange}/>
      <br/>

      <TextField id="outlined-basic" label="consignee" 
      variant="outlined" value={consignee || ""} name="consignee" type="text"
      onChange={handleInputChange}/>
      <br/>
        <Button   variant="contained" 
            style={{marginTop:"10px", marginBottom: "10px"}}
            color="primary" 
            type="submit">
            Update
        </Button>
    </Box>
    </div>
    )
};

export default EditShipment;