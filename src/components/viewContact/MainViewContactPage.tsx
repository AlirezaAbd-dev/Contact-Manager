"use client";
import dynamic from "next/dynamic";
import useSWR from "swr";

import MainContainer from "../../containers/MainContainer";
import ViewContactAvatar from "../../components/viewContact/ViewContactAvatar";
import ViewContactInfo from "../../components/viewContact/ViewContactInfo";
import BackToHomeButton from "../../components/ui/BackToHomeButton";
import ViewContactCardSkeleton from "../../components/Skeletons/ViewContactCardSkeleton";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getSingleContactFetcher } from "../../services/contactServices";
import { Triangle } from "react-loader-spinner";
import { useTheme } from "@mui/material";

const ViewContactCard = dynamic(
  () => import("../../components/viewContact/ViewContactCard"),
  {
    loading: () => (
      // VIEW CONTACT SKELETON
      <ViewContactCardSkeleton />
    ),
  }
);

const MainViewContactPage = ({ id }: { id: string }) => {
  const token = useLocalStorage("user-token");
  const theme = useTheme();

  const { data, isLoading, error } = useSWR(
    [`/api/contact/${id}`, token],
    getSingleContactFetcher
  );

  return (
    <MainContainer>
      {isLoading && (
        <Triangle
          height="150"
          width="150"
          color={theme.palette.primary.main}
          ariaLabel="triangle-loading"
          visible={true}
        />
      )}
      {data && data.contact && (
        <ViewContactCard>
          {/* AVATAR */}
          <ViewContactAvatar
            imageSrc={data.contact.image}
            alt={data.contact.fullname}
          />

          {/* INFORMATION */}
          <ViewContactInfo contact={data.contact} />

          {/* BUTTON */}
          <BackToHomeButton />
        </ViewContactCard>
      )}
    </MainContainer>
  );
};

export default MainViewContactPage;
