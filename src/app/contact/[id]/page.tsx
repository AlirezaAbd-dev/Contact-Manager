import MainViewContactPage from "../../../components/viewContact/MainViewContactPage";

import {getAllContacts, getContactById} from "../../../services/contactServices";

const ViewContact = async ({params: {id}}) => {
    const data = await getContactById(id);

    return <MainViewContactPage contact={data}/>;
};

export default ViewContact;

export const generateStaticParams = async () => {
    const data = await getAllContacts()

    return data.map(data => ({
        id: data.id.toString()
    }))
}