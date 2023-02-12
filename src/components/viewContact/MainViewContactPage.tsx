"use client";
import dynamic from "next/dynamic";

import MainContainer from "@/containers/MainContainer";
import ViewContactAvatar from "@/components/viewContact/ViewContactAvatar";
import ViewContactInfo from "@/components/viewContact/ViewContactInfo";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import ViewContactCardSkeleton from "@/components/Skeletons/ViewContactCardSkeleton";

const ViewContactCard = dynamic(() =>
    import("@/components/viewContact/ViewContactCard",{
        loading: () => (
            // VIEW CONTACT SKELETON
            <ViewContactCardSkeleton/>
        )
    })
);

const MainViewContactPage = ({contact}) => {
    return (
        <MainContainer>
            <ViewContactCard>
                {/* AVATAR */}
                <ViewContactAvatar imageSrc={contact.avatar} alt={contact.username}/>

                {/* INFORMATION */}
                <ViewContactInfo contact={contact}/>

                {/* BUTTON */}
                <BackToHomeButton/>
            </ViewContactCard>
</MainContainer>
)
    ;
};

export default MainViewContactPage;
