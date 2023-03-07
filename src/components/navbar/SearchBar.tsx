import { ChangeEvent, useState } from "react";
import { Autocomplete, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
import { useRouter } from "next/navigation";

import { contactType } from "../../services/contactServices";

const SearchBar = ({ data }: { data: contactType[] }) => {
  const [options] = useState(
    data?.map((option) => ({
      id: option.id,
      name: option.name,
    }))
  );

  const router = useRouter();

  const onChangeHandler = (
    _e: ChangeEvent,
    value: { id: number; name: string }
  ) => {
    if (value) {
      router.push(`/contact/${value.id}`);
    }
  };

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
        <Autocomplete
          sx={{ my: 1 }}
          disablePortal
          id="search-contacts"
          onChange={onChangeHandler}
          fullWidth
          getOptionLabel={(option) => option.name}
          options={options}
          renderInput={(params) => {
            return <TextField {...params} label="جستجوی مخاطب" />;
          }}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ bgcolor: "background.default" }}
              {...props}
            >
              <RecentActorsOutlinedIcon
                width="20"
                sx={{ mr: 2, flexShrink: 0 }}
              />
              {option.name}
            </Box>
          )}
        />
      </Box>
    </Grid>
  );
};

export default SearchBar;
