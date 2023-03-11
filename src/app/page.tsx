import MainContactPage from "../components/contacts/MainContactPage";

import { getAllContacts } from "../services/contactServices";

export const revalidate = 10;
export const fetchCache = "default-cache";

const Contacts = async () => {
  const data = await getAllContacts();

  return <MainContactPage data={data} />;
};

export default Contacts;
