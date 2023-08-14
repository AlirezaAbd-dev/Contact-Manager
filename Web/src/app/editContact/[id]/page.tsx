import { Metadata } from "next";
import MainEditContactPage from "../../../components/editContact/MainEditContactPage";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const EditContact = ({ params: { id } }: { params: { id: number } }) => {
  return <MainEditContactPage id={id} />;
};

export default EditContact;
