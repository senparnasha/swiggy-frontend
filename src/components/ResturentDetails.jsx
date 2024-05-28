import React from "react";
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  CardActionArea,
  IconButton,
  Collapse,
  Snackbar,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddEditMenu from "./AddEditMenu";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import MuiAlert from "@mui/material/Alert";

// const schema = yup.object().shape({
//   resturentName: yup.string().required("Resturent Name is required"),
//   address: yup.string().required("Resturent Address is required"),
//   phoneNum: yup.string().required("Resturent Phone Number is required"),
//   costing: yup.string().required("Costing is required"),
// });

function ResturentDetails() {
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm({ resolver: yupResolver(schema) });

  const [resturentName, setResturentName] = useState("");
  const [resturentAddress, setResturentAddress] = useState("");
  const [phnNo, setPhnNo] = useState("");
  const [costing, setCosting] = useState("");
  const [rows, setRows] = useState([]);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const columns = [
    {
      field: "sl_no",
      headerName: "Sl. No",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "category",
      headerName: "Category",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            {/* Edit icon */}
            <IconButton onClick={() => handleEdit(params)}>
              <EditIcon />
            </IconButton>
            {/* Delete icon */}
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleEdit = () => {};

  const handleDelete = () => {};

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const params = useParams();

  const id = params.id;
  console.log("iffff", id);

  useEffect(() => {
    fetchResturentDetails(id);
    fetchMenu(id);
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
      setResturentName(name);
      setResturentAddress(address);
      setPhnNo(phn_no);
      setCosting(costing);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMenu = async (id) => {
    try {
      let payload = {
        res_id: id,
      };
      const response = await axios.post(
        "http://localhost:3001/resturent/menu",
        payload
      );
      // console.log("Menu......", response.data.data);
      // setRows(response.data.data)

      let rowData = response.data.data;

      let filteredData = rowData.map((row, index) => {
        return { ...row, sl_no: index + 1 };
      });

      setRows(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleEdit = () => {
    setCollapseOpen((prev) => !prev);
  };

  const handleCreateMenu = async (data) => {
    console.log("Menu List", data);
    try {
      await axios.post("http://localhost:3001/resturent/menu/create", data);
      setSnackbarMessage({
        msg: "Menu created successfully",
        status: "success",
      });
      setOpenSnackbar(true);
      fetchMenu(id);
    } catch (error) {
      console.log("Error creating Menu", error.response.data.Error);
      setSnackbarMessage({ msg: error.response.data.Error, status: "error" });
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      {/* <Box sx={{ backgroundColor: "#ecf8ff" }} px={3} py={3}>
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
          
          </Grid>{" "}
          <Box display="flex" justifyContent="right" gap={2} my={1}>
            <Button variant="outlined"> Cancel </Button>
            <Button variant="contained" type="submit">
              {" "}
              Confirm{" "}
            </Button>{" "}
          </Box>
        </form>
      </Box> */}
      <Card fullWidth sx={{ backgroundColor: "#f0f3f7" }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {resturentName}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Address:{" "}
              <Typography variant="bod2">{resturentAddress}</Typography>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Contact Us: <Typography variant="span">{phnNo}</Typography>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Costing: <Typography variant="span">{costing}</Typography>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box>
        <Typography variant="h5" mt={2}>
          Menu Details
        </Typography>
      </Box>
      <Box display="flex" justifyContent="right" my={4}>
        <Button
          startIcon={<AddCircleOutlinedIcon />}
          variant="contained"
          onClick={() => {
            setCollapseOpen((prev) => !prev);
          }}
        >
          Add
        </Button>
      </Box>
      <Box mt={2}>
        <Collapse in={collapseOpen}>
          <AddEditMenu
            toggleEdit={toggleEdit}
            createMenu={(data) => handleCreateMenu(data)}
            res_id={id}
          />
        </Collapse>
      </Box>
      <Box style={{ width: "100%" }} mt={3}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
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
}

export default ResturentDetails;
