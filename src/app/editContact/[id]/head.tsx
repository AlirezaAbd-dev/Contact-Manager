import { notFound, redirect } from "next/navigation";
import { getContactById } from "../../../services/contactServices";

const EditContactHead = async ({ params: { id } }) => {
  const { name } = await getContactById(id);

  if (!name) {
    return;
  }

  const titleName = `ویرایش مخاطب | ${name}`;

  return (
    <>
      <title>{titleName}</title>
    </>
  );
};

export default EditContactHead;
