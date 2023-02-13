"use client";
import { useState } from "react";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

const ViewContactAvatar = ({
  imageSrc,
  alt,
}: {
  imageSrc: string;
  alt: string;
}) => {
  const [isImageLoading, setIsImageLoading] = useState<string | null>();

  return (
    <>
      {!isImageLoading && (
        <Skeleton
          variant="circular"
          sx={{
            width: {
              xs: 200,
              sm: 200,
              md: 300,
            },
            height: {
              xs: 200,
              sm: 200,
              md: 300,
            },
          }}
        />
      )}
      <Avatar
        variant="circular"
        sx={{
          display: isImageLoading ? "block" : "none",
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
            width: "100%",
            height: "auto",
            objectFit: "fill",
          }}
          onLoad={() => {
            setIsImageLoading(imageSrc);
          }}
        />
      </Avatar>
    </>
  );
};

export default ViewContactAvatar;
