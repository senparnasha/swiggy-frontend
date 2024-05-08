import { Button, TextField, Typography, Box, Grid } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

let userSchema = yup.object({
  name: yup.string().required("name is required"),
  email: yup.string().required("Phone number is required"),
  password: yup.string().required("password is required"),
});
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const onSubmit = async (data) => {
    try {
      const createUser = await axios.post(
        "http://localhost:3001/user/login",
        data
      );
      console.log(createUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <Box my={2} >
      <Box  display='flex' justifyContent='center'>
        <Typography variant="h3"> Login</Typography>
      </Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
      
      
      <Grid item xs={12} sm={12} md={6} lg={12}>
      <Typography>Email</Typography>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={12}>
      <Typography>Password</Typography>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />
      </Grid>
      </Grid>
      <Box mt={3}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
    </Box>
  );
};

export default Login;
