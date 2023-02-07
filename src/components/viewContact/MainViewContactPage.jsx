"use client";
import MainContainer from "@/containers/MainContainer";
import ViewContactCard from "@/components/viewContact/ViewContactCard";
import ViewContactAvatar from "@/components/viewContact/ViewContactAvatar";
import ViewContactInfo from "@/components/viewContact/ViewContactInfo";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import ViewContactCardSkeleton from "@/components/Skeletons/ViewContactCardSkeleton";

const MainViewContactPage = ({ contact }) => {
  return (
    <MainContainer>
      {true && (
        <ViewContactCard>
          {/* AVATAR */}
          <ViewContactAvatar imageSrc={contact.avatar} alt={contact.username} />

          {/* INFORMATION */}
          <ViewContactInfo contact={contact} />

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
