"use client";
import {Avatar} from "@mui/material";
import Image from "next/image";

const ViewContactAvatar = ({imageSrc, alt}) => {
    return (
        <Avatar
            variant="circular"
            sx={{
                width: "40%",
                height: "auto",
            }}
        >
            <Image
                src={imageSrc}
                alt={alt}
                width={300}
                height={300}
                priority
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'fill'
                }}
            />
        </Avatar>
    );
};

export default ViewContactAvatar;
