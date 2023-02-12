import MainEditContactPage from "@/components/editContact/MainEditContactPage";

import {getAllContacts, getContactById} from "@/services/contactServices";

const EditContact = async ({ params: { id } }) => {
  const data = await getContactById(id);

  return <MainEditContactPage data={data} />;
};


export const generateStaticParams = async () => {
  const data = await getAllContacts()

  return data.map(data => ({
    id: data.id.toString()
  }))
}

export default EditContact;
