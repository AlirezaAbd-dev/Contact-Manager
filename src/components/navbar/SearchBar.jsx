import {useState, useEffect} from "react";
import {SearchRounded} from "@mui/icons-material";
import {Autocomplete, Box, CircularProgress, IconButton, Input} from "@mui/material";
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import useSWR from "swr"
import {useRouter} from "next/navigation";

const fetcher = (url) => axios.get(url).then(res => res.data.map((data => ({
    id: data.id,
    name: data.name,
    username: data.username
}))))

const SearchBar = () => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    const router = useRouter()

    const {data, isLoading} = useSWR('https://jsonplaceholder.ir/users', fetcher)

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {

            if (active) {
                setOptions([]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions(data);
        }
    }, [open, data]);

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
                    id="search-contacts"
                    onChange={onSubmitHandler}
                    fullWidth
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    isOptionEqualToValue={(option, value) => option.username === value.username}
                    getOptionLabel={(option) => option.name}
                    options={options}
                    loading={loading}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                label="جستجوی مخاطب"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )
                    }}
                />
            </Box>
        </Grid>
    );
};

export default SearchBar;