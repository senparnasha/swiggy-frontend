import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Box,
  Snackbar,
  Grid,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const userSchema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  phn_no: yup.string().required("Phone Number is required"),
  costing: yup.string().required("Costing is required"),
});

const RegisterResturent = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
      setSnackbarMessage({
        msg: "Restaurant created successfully",
        status: "success",
      });
      setOpenSnackbar(true);
    } catch (error) {
      console.log("Error creating Restaurants", error.response.data.Error);
      setSnackbarMessage({ msg: error.response.data.Error, status: "error" });
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container  spacing={2}>
          <Grid item sm={12} md={4} lg={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Restaurant Name"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid item sm={12} md={4} lg={6}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} md={4} lg={6}>
            <Controller
              name="phn_no"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.phn_no}
                  helperText={errors.phn_no?.message}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} md={4} lg={6}>
            <Controller
              name="costing"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Costing"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.costing}
                  helperText={errors.costing?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box mt={3} display='flex' justifyContent='right'>
          <Button type="submit" variant="contained">Submit</Button>
        </Box>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.status}
          sx={{ width: "100%" }}
        >
          {snackbarMessage.msg}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default RegisterResturent;
