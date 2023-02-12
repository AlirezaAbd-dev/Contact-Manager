import {getContactById} from "../../../services/contactServices";

const ContactHead = async ({params: {id}}) => {
    const {name} = await getContactById(id)

    const titleName = `مدیریت مخاطبین | ${name}`

    return (
        <>
            <title>{titleName}</title>
            <meta name='description' content='از طریق این صفحه میتوانید جزئیات مخاطب مورد نظر خود را ببینید.' />
        </>
    );
};

export default ContactHead;
