import MainContactPage from "../components/contacts/MainContactPage";

import { getAllContacts } from "../services/contactServices";

export const revalidate = 30;

const Contacts = async () => {
  const data = await getAllContacts();

  return <MainContactPage data={data} />;
};

export default Contacts;
