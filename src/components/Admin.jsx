import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button, TextField, Typography, Box, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const userSchema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  phn_no: yup.string().required("Phone Number is required"),
  costing: yup.string().required("Costing is required"),
});

const Admin = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3001/resturent/create", data);
      setSnackbarMessage({msg: 'Restaurant created successfully', status:'success'});
      setOpenSnackbar(true);
    } catch (error) {
      console.log("Error creating Restaurants", error.response.data.Error);
      setSnackbarMessage({msg: error.response.data.Error, status:'error'});
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Restaurant Name</Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
           <Typography>Address</Typography>
    <Controller
      name="address"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.address}
          helperText={errors.address?.message}
        />
      )}
    />
    <Typography>Phone Number</Typography>
    <Controller
      name="phn_no"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.phn_no}
          helperText={errors.phn_no?.message}
        />
      )}
    />
    <Typography>Costing</Typography>
    <Controller
      name="costing"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.costing}
          helperText={errors.costing?.message}
        />
      )}
    />
       
        <Box mt={3}>
          <Button type="submit">Submit</Button>
        </Box>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.status}
          sx={{ width: '100%' }}
        >
          {snackbarMessage.msg}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Admin;
