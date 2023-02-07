import MainViewContactPage from "@/components/viewContact/MainViewContactPage";

import { getContactById } from "@/services/contactServices";

const ViewContact = async ({ params: { id } }) => {
  const data = await getContactById(id);

  return <MainViewContactPage contact={data} />;
};

export default ViewContact;
