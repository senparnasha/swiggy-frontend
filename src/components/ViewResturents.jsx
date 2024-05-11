import { useEffect, useState } from "react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import DeleteModal from "./modal/DeleteModal";



export default function ViewResturents() {
  const [rows, setRows] = useState([]);
  const [open,setOpen]= useState(false)


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
            <IconButton onClick={() => handleEdit(params.row.id)}>
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
  
  const handleEdit=()=>{
  
  }
  
  const handleDelete=()=>{
    console.log("modal")
    setOpen(true)
  }



  useEffect(() => {
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

        setRows(filteredData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{  width: "100%" }}>
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
      <DeleteModal open={open} handleClose={()=>setOpen(false)}/>
    
    </div>
  );
}
