"use client"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useStore } from "../../zustand/store";
import { grey } from "@mui/material/colors";

const DeleteConfirmDialog = () => {
  const isModalOpen = useStore((state) => state.isModalOpen);
  const setIsModalClose = useStore((state) => state.setIsModalClose);

  return (
    <Dialog
      open={isModalOpen}
      onClose={setIsModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "navbar.main",
          borderRadius: 4,
          boxShadow: `-5px 5px 10px 1px ${grey[900]}`,
        },
      }}
    >
        <Typography
          variant="h4"
          sx={{
            m: 3,
            mb: 0,
            color: "warning.main",
          }}
        >
          پاک کردن مخاطب
        </Typography>
      <DialogContent>
        مطمئنی که میخوای مخاطب علیرضا عابدی رو پاک کنی؟
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={setIsModalClose}>
          انصراف
        </Button>
        <Button variant="contained" color="primary">
          مطمئن هستم
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
