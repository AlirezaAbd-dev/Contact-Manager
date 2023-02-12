import MainEditContactPage from "../../../components/editContact/MainEditContactPage";

import { getContactById } from "../../../services/contactServices";

export const dynamic = "force-dynamic";

const EditContact = async ({ params: { id } }: { params: { id: number } }) => {
  const data = await getContactById(id);

  return <MainEditContactPage data={data} />;
};

// export const generateStaticParams = async () => {
//   const data = await getAllContacts()

//   return data.map(data => ({
//     id: data.id.toString()
//   }))
// }

export default EditContact;
