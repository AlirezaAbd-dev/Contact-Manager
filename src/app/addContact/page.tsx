import { Metadata } from "next";
import MainAddContactPage from "../../components/addContact/MainAddContactPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "مدیریت مخاطبین | ساخت مخاطب جدید",
  description:
    "در این صفحه میتوانید مخاطب جدیدی به لیست مخاطبین خود اضافه کنید.",
};

const AddContact = () => {
  return <MainAddContactPage />;
};

export default AddContact;
