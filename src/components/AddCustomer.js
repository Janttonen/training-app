import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

export default function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    email: '',
    phone: '',
    city: '',
    postcode: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {

    //if (isNumber(car.price)) validation hyödyllistä D:
    //https://react-hook-form.com/
    //text field is required jne jne jne
    props.addCustomer(customer);
    console.log(customer);
    setOpen(false);
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>hahaha</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Please add your information.
          </DialogContentText>
          <TextField
            margin="dense"
            label="First name"
            fullWidth
            variant="standard"
            value={customer.firstname}
            onChange={e => setCustomer({...customer, firstname: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Last name"
            fullWidth
            variant="standard"
            value={customer.lastname}
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Street address"
            fullWidth
            variant="standard"
            value={customer.streetaddress}
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            value={customer.email}
            onChange={e => setCustomer({...customer, email: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
            value={customer.phone}
            onChange={e => setCustomer({...customer, phone: e.target.value})}
          />
          <TextField
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
            value={customer.city}
            onChange={e => setCustomer({...customer, city: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Postcode"
            fullWidth
            variant="standard"
            value={customer.postcode}
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Add</Button>
        </DialogActions>
      </Dialog>
      
    </>
  );
}