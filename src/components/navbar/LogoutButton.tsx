"use client";
import { Logout } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const LogoutButton = ({ showLogout }) => {
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("user-token");
    router.replace("/signIn");
  };

  return (
    <>
      {showLogout && (
        <Tooltip arrow title="خروج از حساب">
          <IconButton
            onClick={logoutHandler}
            sx={{
              position: "absolute",
              right: 15,
            }}
          >
            <Logout />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default LogoutButton;
