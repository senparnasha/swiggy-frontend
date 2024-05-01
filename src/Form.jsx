import { Button, TextField, Typography, Box } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

let userSchema = yup.object({
  name: yup.string().required("name is required"),
  phn_no: yup.string().required("Phone number is required"),
  password: yup.string().required("password is required"),
});
const Form = () => {
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
        "http://localhost:3001/user/register",
        data
      );
      console.log(createUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>Name</Typography>
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
      <Typography>Phn No</Typography>
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
      <Box mt={3}>
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

export default Form;
