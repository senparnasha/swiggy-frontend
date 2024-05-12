import { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Box,
  Button,
 
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


// import PropTypes from 'prop-types';

const schema = yup.object().shape({
    resturentName: yup.string().required("Resturent Name is required"),
  address: yup.string().required("Resturent Address is required"),
  phoneNum: yup.string().required("Resturent Phone Number is required"),
  costing:yup.string().required("Costing is required"),
});

const AddEdit = ({ toggleEdit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
   
  };
  
  return (
    <Box sx={{backgroundColor:'#ecf8ff'}} px={3} py={3}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={12} md={4} lg={6} my={1}>
          <Typography fontWeight={700} mb={1}>
            {" "}
            Resturent Name{" "}
          </Typography>
          <Controller
            name="resturentName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-basic"
                variant="outlined"
                fullWidth
                placeholder="Resturent Name"
                error={!!errors.resturentName}
                helperText={errors.resturentName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={6} my={1}>
          <Typography fontWeight={700} mb={1}>
            {" "}
          Address{" "}
          </Typography>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
                <TextField
                {...field}
                id="outlined-basic"
                variant="outlined"
                fullWidth
                placeholder="address"
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={6} my={1}>
          <Typography fontWeight={700} mb={1}>
            {" "}
            Phone Number{" "}
          </Typography>
          <Controller
            name="phoneNum"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-basic"
                variant="outlined"
                fullWidth
                placeholder="Phone Number"
                error={!!errors.phoneNum}
                helperText={errors.phoneNum?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={6} my={1}>
          <Typography fontWeight={700} mb={1}>
            {" "}
           Costing{" "}
          </Typography>
          <Controller
            name="costing"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-basic"
                variant="outlined"
                fullWidth
                placeholder="Costing"
                error={!!errors.costing}
                helperText={errors.costing?.message}
              />
            )}
          />
        </Grid>
        {/* next row */}
      </Grid>{" "}
      <Box display="flex" justifyContent="right" gap={2} my={1}>
        <Button variant="outlined" onClick={toggleEdit}>
          {" "}
          Cancel{" "}
        </Button>
        <Button variant="contained" type="submit">
          {" "}
          Confirm{" "}
        </Button>{" "}
      </Box>
      
    </form>
    </Box>
  );
};

export default AddEdit;
