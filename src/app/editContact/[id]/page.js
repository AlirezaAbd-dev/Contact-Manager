import MainEditContactPage from "@/components/editContact/MainEditContactPage";

import { getContactById } from "@/services/contactServices";

const EditContact = async ({ params: { id } }) => {
  const data = await getContactById(id);

  return <MainEditContactPage data={data} />;
};

export default EditContact;
