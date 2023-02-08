"use client"
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Grid from "@mui/material/Unstable_Grid2";
import NavbarContainer from "../../containers/NavbarContainer";
import LogoutButton from "./LogoutButton";

const Header = ({ showSearch, showLogout = false, data }) => {
  return (
    <NavbarContainer>
      <LogoutButton showLogout={showLogout} />
      <Grid
        display="flex"
        maxWidth="900px"
        width="70%"
        height="100%"
        justifyContent="space-between"
        sx={{
          width: {
            xs: "95%",
            sm: "90%",
            md: "70%",
          },
        }}
        container
      >
        <Logo showSearch={showSearch} />
        {showSearch && <SearchBar data={data} />}
      </Grid>
    </NavbarContainer>
  );
};

export default Header;
