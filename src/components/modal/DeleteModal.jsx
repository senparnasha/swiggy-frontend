import * as React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteModal = ({ open, handleClose, deleteRow }) => {
  const handleCancel = () => {
    handleClose();
  };

  const handleDelete = () => {
    deleteRow();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Are you sure you want to Delete?
          </Typography>

          <Box
            display="flex"
            justifyContent="right"
            alignItems="center"
            gap={2}
            mt={2}
          >
            <Button variant="contained" mt={1} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" mt={1} onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
};

export default DeleteModal;
