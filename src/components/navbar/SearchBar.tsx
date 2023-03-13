import { ChangeEvent } from "react";
import { Autocomplete, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import useLocalStorage from "../../hooks/useLocalStorage";
import {
  getContactsForSearchFetcher,
  SearchContact,
} from "../../services/contactServices";

const SearchBar = () => {
  const token = useLocalStorage("user-token");

  const { data } = useSWR(
    [`/api/contacts?search=true`, token],
    getContactsForSearchFetcher
  );

  const router = useRouter();

  const onChangeHandler = (
    _e: ChangeEvent,
    value: { fullname: string; _id: string }
  ) => {
    if (value) {
      router.push(`/contact/${value._id}`);
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
        {data?.contacts.length !== undefined && data?.contacts.length >= 1 && (
          <Autocomplete
            sx={{ my: 1 }}
            disablePortal
            id="search-contacts"
            onChange={onChangeHandler}
            fullWidth
            getOptionLabel={(option) => option?.fullname}
            options={data.contacts}
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
                {option.fullname}
              </Box>
            )}
          />
        )}
      </Box>
    </Grid>
  );
};

export default SearchBar;
