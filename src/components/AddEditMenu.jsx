import { useEffect, useState } from "react";
import { Typography, Grid, TextField, Box, Button, Snackbar, } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import PropTypes from 'prop-types';


const schema = yup.object().shape({
    // id: yup.string().required("Menu id is required"),
  name: yup.string().required("Menu Name is required"),
  category: yup.string().required("Menu Category is required"),
  price: yup.string().required("Price is required"),
  
});

const AddEditMenu = ({
  toggleEdit,
  createMenu,
  res_id
}) => {
  
  

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema), 
  });


  useEffect(()=>{
    setValue("res_id", res_id)

   
  },[res_id])


 

  const onSubmit = async (data) => {
    console.log(data);
   createMenu(data)
   reset({
    name:"",
    category:"",
    price:"",
    
   });
  };

 

  return (
    <Box sx={{ backgroundColor: "#ecf8ff" }} px={3} py={3}>
 
      <form onSubmit={handleSubmit(onSubmit)} mt={1}>
        <Grid container columnSpacing={3}>
        {/* <Grid item xs={12} sm={12} md={4} lg={6} my={1}>
            <Typography fontWeight={700} mb={1}>
              {" "}
              Id{" "}
            </Typography>
            <Controller
              name="res_id"
              control={control}
            
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  variant="outlined"
             
                  fullWidth
                hidden
                  error={!!errors.id}
                  helperText={errors.id?.message}
                />
              )}
            />
          </Grid> */}
          <Grid item xs={12} sm={12} md={4} lg={6} my={1}>
            <Typography fontWeight={700} mb={1}>
              {" "}
              Menu Name{" "}
            </Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  variant="outlined"
                  // defaultValue={"name"}
                  fullWidth
                  placeholder="Menu Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                   defaultValue=""
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={6} my={1}>
            <Typography fontWeight={700} mb={1}>
              {" "}
              Category{" "}
            </Typography>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  variant="outlined"
                  //   defaultValue={address}
                  fullWidth
                  placeholder="category"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                   defaultValue=""
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={6} my={1}>
            <Typography fontWeight={700} mb={1}>
              {" "}
              Price{" "}
            </Typography>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  variant="outlined"
                  //   defaultValue={phnNo}
                  fullWidth
                  placeholder="Price"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                   defaultValue=""
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
          <Button variant="contained" type="submit" >
            {" "}
            Confirm{" "}
          </Button>{" "}
        </Box>
      </form>
     
    </Box>
  );
};

export default AddEditMenu;

