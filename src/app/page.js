import MainContactPage from "@/components/contacts/MainContactPage";

import { getAllContacts } from "@/services/contactServices";

const Contacts = async () => {
  const data = await getAllContacts();

  return <MainContactPage data={data} />;
};

export default Contacts;
