import {getContactById} from "@/services/contactServices";

const EditContactHead = async ({params: {id}}) => {
    const {name} = await getContactById(id)

    const titleName = `ویرایش مخاطب | ${name}`

    return (
        <>
            <title>{titleName}</title>
        </>
    );
};

export default EditContactHead;
