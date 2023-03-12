import MainContactPage from "../components/contacts/MainContactPage";

export const revalidate = 10;
export const fetchCache = "default-cache";

const Contacts = async () => {

  return <MainContactPage />;
};

export default Contacts;
