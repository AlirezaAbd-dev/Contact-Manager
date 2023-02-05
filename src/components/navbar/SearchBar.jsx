import { SearchRounded } from "@mui/icons-material";
import { Box, IconButton, Input } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const SearchBar = () => {
  return (
    <Grid xs={12} sm={12} md={6}>
      <Box
        sx={{
          width: {
            xs: "80%",
            sm: "80%",
            md: "100%",
          },
        }}
      >
        <Input
          placeholder="جستجوی مخاطب"
          fullWidth
          endAdornment={
            <IconButton color="primary">
              <SearchRounded />
            </IconButton>
          }
        />
      </Box>
    </Grid>
  );
};

export default SearchBar;
