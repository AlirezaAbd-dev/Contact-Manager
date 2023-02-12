import MainViewContactPage from "../../../components/viewContact/MainViewContactPage";

import { getContactById } from "../../../services/contactServices";

export const dynamic = "force-dynamic";

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

// export const generateStaticParams = async () => {
//     const data = await getAllContacts()

//     return data.map(data => ({
//         id: data.id.toString()
//     }))
// }
