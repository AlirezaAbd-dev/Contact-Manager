import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const BackToHomeButton = () => {
  return (
    <Link
      to="/"
      style={{
        textDecoration: "none",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        sx={{
          mt: 2,
        }}
      >
        بازگشت به صفحه اصلی
      </Button>
    </Link>
  );
};

export default BackToHomeButton;
