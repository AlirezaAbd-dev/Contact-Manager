"use client";
import {Box, Slide} from "@mui/material";
import Image from "next/image";
import {useEffect, useState} from "react";

import thinkingManImage from "../../assets/man-taking-note.png";

const EditContactSideImage = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        return () => {
            setLoading(false);
        };
    }, []);

    return (
        <Slide
            direction="up"
            in={loading}
            style={{
                transitionDelay: loading ? "300ms" : "0ms",
            }}
        >
            <Box
                sx={{
                    mt: 2,
                    width: {
                        xs: "80%",
                        sm: "80%",
                        md: "70%",
                        lg: "50%",
                    },
                }}
            >
                <Image
                    priority
                    src={thinkingManImage}
                    alt="man taking note"
                    width={1000}
                    height={350}
                    style={{
                        opacity: 0.5,
                        width: "100%",
                        height: 'auto',
                        objectFit: 'fill'
                    }}
                />
            </Box>
        </Slide>
    );
};

export default EditContactSideImage;
