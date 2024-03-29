"use client";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useStore } from "../../zustand/store";
import { grey } from "@mui/material/colors";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import useLocalStorage from "../../hooks/useLocalStorage";
import { deleteContactMutation } from "../../services/contactServices";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const DeleteConfirmDialog = () => {
  const token = useLocalStorage("user-token");
  const isModalOpen = useStore((state) => state.isModalOpen);
  const setIsModalClose = useStore((state) => state.setIsModalClose);
  const selectedContactId = useStore((state) => state.selectedContactId);
  const selectedContactName = useStore((state) => state.selectedContactName);
  const searchParams = useSearchParams();

  let pageQuery = searchParams?.get("page");

  const { trigger, data, isMutating, error } = useSWRMutation(
    [`/api/contact/${selectedContactId}`, token],
    deleteContactMutation
  );

  useEffect(() => {
    if (data) {
      toast.success("مخاطب مورد نظر با موفقیت حذف شد");
      setIsModalClose();
      mutate([`/api/contacts?page=${pageQuery || 1}`, token]);
    }
  }, [data, pageQuery, setIsModalClose, token]);

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message);

      if (error.response.status === (404 || 401)) {
        setIsModalClose();
      }
    }
  }, [error, setIsModalClose]);

  const deleteHandler = () => {
    trigger();
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={setIsModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "navbar.main",
          borderRadius: 10,
          boxShadow: `-5px 5px 10px 1px ${grey[900]}`,
          p: 2,
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
        مطمئنی که میخوای مخاطب {selectedContactName} رو پاک کنی؟
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={setIsModalClose}
          sx={{ borderRadius: "20px" }}
        >
          انصراف
        </Button>
        <LoadingButton
          loading={isMutating}
          loadingIndicator={<CircularProgress size={20} />}
          variant="contained"
          color="primary"
          onClick={deleteHandler}
          sx={{ borderRadius: "20px" }}
        >
          مطمئن هستم
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
