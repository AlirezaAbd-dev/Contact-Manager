import { Metadata } from "next";
import MainEditContactPage from "../../../components/editContact/MainEditContactPage";

import {
  getAllContacts,
  getContactById,
} from "../../../services/contactServices";

// export const dynamic = "force-dynamic";
export const revalidate = 10;
export const fetchCache = "force-cache";
export const dynamicParams = false;
export const metadata: Metadata = {
  description:
    "در این صفخه میتوانید مخاطبین خود را ویرایش و دوباره ذخیره کنید.",
};

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const name = await getContactById(+params.id).then((res) => res.name);

  return {
    title: `ویرایش مخاطب | ${name}`,
  };
};

const EditContact = async ({ params: { id } }: { params: { id: number } }) => {
  const data = await getContactById(id);

  if (!data) {
    return;
  }

  return <MainEditContactPage data={data} />;
};

export const generateStaticParams = async () => {
  const data = await getAllContacts();

  return data.map((data) => ({
    id: data.id.toString(),
  }));
};

export default EditContact;
