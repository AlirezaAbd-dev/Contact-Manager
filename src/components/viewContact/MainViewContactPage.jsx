"use client";
import { Suspense, lazy } from "react";

import MainContainer from "@/containers/MainContainer";
import ViewContactAvatar from "@/components/viewContact/ViewContactAvatar";
import ViewContactInfo from "@/components/viewContact/ViewContactInfo";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import ViewContactCardSkeleton from "@/components/Skeletons/ViewContactCardSkeleton";

const ViewContactCard = lazy(() =>
  import("@/components/viewContact/ViewContactCard")
);

const MainViewContactPage = ({ contact }) => {
  return (
    <MainContainer>
      <Suspense
        fallback={
          // SKELETON CARD
          <ViewContactCardSkeleton />
        }
      >
        <ViewContactCard>
          {/* AVATAR */}
          <ViewContactAvatar imageSrc={contact.avatar} alt={contact.username} />

          {/* INFORMATION */}
          <ViewContactInfo contact={contact} />

          {/* BUTTON */}
          <BackToHomeButton />
        </ViewContactCard>
      </Suspense>
    </MainContainer>
  );
};

export default MainViewContactPage;
