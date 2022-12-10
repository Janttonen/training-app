import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: dayjs(),
    activity: "",
    duration: "",
    customer: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add training</DialogTitle>
        <DialogContent>
          <DialogContentText>Please add your information.</DialogContentText>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date"
              value={training.date}
              onChange={(newValue) =>
                setTraining({
                  ...training,
                  date: dayjs(newValue).toISOString(),
                })
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
          />
          <>
            <InputLabel id="demo-simple-select-helper-label">
              Customer
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Customer"
              value={training.customer}
              onChange={(e) =>
                setTraining({ ...training, customer: e.target.value })
              }
            >
              {props.customers.map((customer, index) => (
                <MenuItem key={index} value={customer.links[1].href}>
                  {customer.firstname}
                </MenuItem>
              ))}
            </Select>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
