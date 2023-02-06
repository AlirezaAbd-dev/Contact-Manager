"use client";
import MainContainer from "@/containers/MainContainer";
import ViewContactCard from "@/components/viewContact/ViewContactCard";
import ViewContactAvatar from "@/components/viewContact/ViewContactAvatar";
import ViewContactInfo from "@/components/viewContact/ViewContactInfo";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import ViewContactCardSkeleton from "@/components/Skeletons/ViewContactCardSkeleton";

const MainViewContactPage = () => {
  return (
    <MainContainer>
      {true && (
        <ViewContactCard>
          {/* AVATAR */}
          <ViewContactAvatar />

          {/* INFORMATION */}
          <ViewContactInfo />

          {/* BUTTON */}
          <BackToHomeButton />
        </ViewContactCard>
      )}

      {/* SKELETON CARD */}
      {false && <ViewContactCardSkeleton />}
    </MainContainer>
  );
};

export default MainViewContactPage;
