import { Metadata } from "next";
import MainViewContactPage from "../../../components/viewContact/MainViewContactPage";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const ViewContact = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  return <MainViewContactPage id={id} />;
};

export default ViewContact;
