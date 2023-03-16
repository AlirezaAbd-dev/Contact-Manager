"use client";
import { useState } from "react";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

import avatarPlaceholder from "../../assets/placeholder-avatar.png";

const ViewContactAvatar = ({
  imageSrc,
  alt,
}: {
  imageSrc?: string;
  alt: string;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState<string | null>();

  return (
    <>
      {!isImageLoaded && imageSrc && (
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
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          width={300}
          height={300}
          priority
          style={{
            display: isImageLoaded ? "block" : "none",
            borderRadius: "100%",
            width: "40%",
            height: "auto",
            objectFit: "fill",
          }}
          onLoad={() => {
            setIsImageLoaded(imageSrc);
          }}
        />
      ) : (
        <Image
          src={avatarPlaceholder.src}
          alt={alt}
          width={300}
          height={300}
          priority
          style={{
            display: "block",
            borderRadius: "100%",
            width: "40%",
            height: "auto",
            objectFit: "fill",
          }}
        />
      )}
    </>
  );
};

export default ViewContactAvatar;
