import { Metadata } from "next";
import MainEditContactPage from "../../../components/editContact/MainEditContactPage";

import { getContactById } from "../../../services/contactServices";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

// export const generateMetadata = async ({ params }): Promise<Metadata> => {
// const name = await getContactById(+params.id).then((res) => res.name);
// 
//   return {
//     title: `ویرایش مخاطب | ${name}`,
//     description: `در این صفخه میتوانید مخاطبین خود را ویرایش و دوباره ذخیره کنید. ویرایش مخاطب ${name}`,
//   };
// };

const EditContact = async ({ params: { id } }: { params: { id: number } }) => {
  return <MainEditContactPage id={id} />;
};

export default EditContact;
