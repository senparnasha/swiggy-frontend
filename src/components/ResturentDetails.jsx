import React from "react";
import { useEffect, useState } from "react";
import { Typography, Grid, TextField, Box, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useParams } from "react-router";

const schema = yup.object().shape({
  resturentName: yup.string().required("Resturent Name is required"),
  address: yup.string().required("Resturent Address is required"),
  phoneNum: yup.string().required("Resturent Phone Number is required"),
  costing: yup.string().required("Costing is required"),
});

function ResturentDetails() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  const params = useParams();

  const id = params.id;
  console.log("iffff", id);

  useEffect(() => {
    fetchResturentDetails(id);
  }, []);

  const fetchResturentDetails = async (id) => {
    console.log("llllll", id);
    try {
      let payload = {
        id: id,
      };
      const response = await axios.post(
        "http://localhost:3001/resturent/view/resturent",
        payload
      );
      console.log("data", response.data.data);
      const { name, address, phn_no, costing } = response.data.data;

      setValue("resturentName", name);
      setValue("address", address);
      setValue("phoneNum", phn_no);
      setValue("costing", costing);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  return (
    <div>
      <Box sx={{ backgroundColor: "#ecf8ff" }} px={3} py={3}>
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
                    //   defaultValue={address}
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
                    //   defaultValue={phnNo}
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
                    //   defaultValue={costing}
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
            <Button variant="outlined"> Cancel </Button>
            <Button variant="contained" type="submit">
              {" "}
              Confirm{" "}
            </Button>{" "}
          </Box>
        </form>
      </Box>
    </div>
  );
}

export default ResturentDetails;
