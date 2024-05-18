import { useEffect, useState } from "react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, IconButton, Snackbar, Box, Collapse } from "@mui/material";
import DeleteModal from "./modal/DeleteModal";
import MuiAlert from "@mui/material/Alert";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AddEdit from "./AddEdit";
import { useNavigate } from "react-router";

export default function ViewResturents() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phnNo, setPhnNo] = useState("");
  const [costing, setCosting] = useState("");
  const [resturentId, setResturentId] = useState("");

  const navigate=useNavigate()

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
      field: "address",
      headerName: "Address",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phn_no",
      headerName: "Phone Number",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "costing",
      headerName: "Costing",
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
            <IconButton onClick={() => handleView(params)}>
              <VisibilityIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/resturent/view/all"
      );
      console.log("data", response.data.rows);

      let rowData = response.data.rows;

      let filteredData = rowData.map((row, index) => {
        return { ...row, sl_no: index + 1 };
      });

      setRows(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


const handleView=(params)=>{
  console.log("view",params.row)
  navigate(`/admin/resturent/view/${params.row.id}`)
}

  const handleEdit = (params) => {
    console.log("hhhh", params);
    setResturentId(params.row.id);
    setName(params.row.name);
    setAddress(params.row.address);
    setPhnNo(params.row.phn_no);
    setCosting(params.row.costing);
    console.log(params.row);

    setCollapseOpen((prev) => !prev);
  };

  const editRow = async (id, name, address, phnNo, costing) => {
    console.log("called", id, name, address, phnNo, costing);

    try {
      let payload = {
        id: id,
        name: name,
        address: address,
        phnNo: phnNo,
        costing: costing,
      };

      await axios.post("http://localhost:3001/resturent/edit", payload);
      setSnackbarMessage({
        msg: "Restaurant Edited successfully",
        status: "success",
      });
      setOpenSnackbar(true);
      fetchData();
    } catch (error) {
      console.log("Error Editing Restaurants", error.response.data.Error);
      setSnackbarMessage({ msg: error.response.data.Error, status: "error" });
      setOpenSnackbar(true);
    } finally {
      setOpen(false);
    }
  };

  const handleDelete = (id) => {
    setSelectedRow(id);
    setOpen(true);
  };

  const deleteRow = async () => {
    try {
      let payload = {
        id: selectedRow,
      };

      await axios.post("http://localhost:3001/resturent/delete", payload);
      setSnackbarMessage({
        msg: "Restaurant Deleted successfully",
        status: "success",
      });
      setOpenSnackbar(true);
      fetchData();
    } catch (error) {
      console.log("Error deleting Restaurants", error.response.data.Error);
      setSnackbarMessage({ msg: error.response.data.Error, status: "error" });
      setOpenSnackbar(true);
    } finally {
      setOpen(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const toggleEdit = () => {
    setCollapseOpen((prev) => !prev);
  };
  return (
    <>
      <Box>
        <Box display="flex" justifyContent="right" my={4}>
          <Button
            startIcon={<AddCircleOutlinedIcon />}
            variant="contained"
            onClick={() => {
              setName("");
              setAddress("");
              setPhnNo("");
              setCosting("");
              setCollapseOpen((prev) => !prev);
            }}
          >
            Add
          </Button>
        </Box>
        <Box mt={2}>
          <Collapse in={collapseOpen}>
            <AddEdit
              id={resturentId}
              name={name}
              address={address}
              phnNo={phnNo}
              costing={costing}
              editRow={(id, name, address, phnNo, costing) => {
                editRow(id, name, address, phnNo, costing);
              }}
              toggleEdit={toggleEdit}
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
          <DeleteModal
            open={open}
            handleClose={() => setOpen(false)}
            deleteRow={() => {
              deleteRow();
            }}
          />

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
        </Box>
      </Box>
    </>
  );
}
