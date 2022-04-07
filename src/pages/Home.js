import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { loadShipments, deleteShipment } from "../redux/actions";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useHistory} from 'react-router-dom';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  


  
const Home = () => {

    let dispatch = useDispatch();

    let history = useHistory();

    const {shipments} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(loadShipments())
    }, []);

    const handleDelete = (id) => {
        if(window.confirm("Are you sure to delete the shipment?")){
            dispatch(deleteShipment(id));
        }
    }
    
    return( <div>
        
            <Button   variant="contained" 
            style={{marginTop:"10px", marginBottom: "10px"}}
            color="primary" 
            onClick={() => history.push("/addShipment")}>
            Add shipment
            </Button>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900, marginTop:0}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>OrderNo</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Customer</StyledTableCell>
            <StyledTableCell align="center">TrackingNo</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Consignee</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shipments && shipments.map((shipment) => (
            <StyledTableRow key={shipment.id}>
              <StyledTableCell component="th" scope="row">
                {shipment.orderNo}
              </StyledTableCell>
              <StyledTableCell align="center">{shipment.date}</StyledTableCell>
              <StyledTableCell align="center">{shipment.customer}</StyledTableCell>
              <StyledTableCell align="center">{shipment.trackingNo}</StyledTableCell>
              <StyledTableCell align="center">{shipment.status}</StyledTableCell>
              <StyledTableCell align="center">{shipment.consignee}</StyledTableCell>
              <StyledTableCell align="center">
                <ButtonGroup variant="contained" 
                aria-label="outlined button group">
                    <Button  color="primary"
                    onClick={() => history.push(`/editShipment/${shipment.id}`)}
                    >Edit
                    </Button>
                    <Button  
                    variant="outlined"
                    onClick={() => handleDelete(shipment.id)}
                    >Delete</Button>
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>

    )
}

export default Home;