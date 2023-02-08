import {useState} from "react";
import {Autocomplete, Box} from "@mui/material";
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Unstable_Grid2";
import {useRouter} from "next/navigation";
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';

const SearchBar = ({data}) => {
    const [open, setOpen] = useState(false);
    const [options] = useState(data.map(option => ({
        id: option.id,
        name: option.name
    })));

    const router = useRouter()

    const onSubmitHandler = (_e, value) => {
        if (value) {
            router.push(`/contact/${value.id}`)
        }
    }

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
                    sx={{my: 1}}
                    disablePortal
                    id="search-contacts"
                    onChange={onSubmitHandler}
                    fullWidth
                    getOptionLabel={(option) => option.name}
                    options={options}
                    renderInput={(params) => {
                        return <TextField
                            {...params}
                            label="جستجوی مخاطب"
                        />
                    }}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{bgcolor: 'background.default'}}{...props}>
                            <RecentActorsOutlinedIcon
                                width="20"
                                sx={{mr: 2, flexShrink: 0}}
                                alt={option.name}
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