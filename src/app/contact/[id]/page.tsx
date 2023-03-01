import { Metadata } from "next";
import MainViewContactPage from "../../../components/viewContact/MainViewContactPage";

import {
  getAllContacts,
  getContactById,
} from "../../../services/contactServices";

export const fetchCache = "force-cache";
export const revalidate = 10;
export const dynamicParams = false;

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const name = await getContactById(+params.id).then((res) => res.name);

  return {
    title: `مدیریت مخاطبین | ${name}`,
    description: `از طریق این صفحه میتوانید جزئیات مخاطب مورد نظر خود را ببینید. صفحه نمایش مخاطب ${name}`,
  };
};

const ViewContact = async ({
  params: { id },
}: {
  params: {
    id: number;
  };
}) => {
  const data = await getContactById(id);

  return <MainViewContactPage contact={data} />;
};

export default ViewContact;

export const generateStaticParams = async () => {
  const data = await getAllContacts();

  return data.map((data) => ({
    id: data.id.toString(),
  }));
};
