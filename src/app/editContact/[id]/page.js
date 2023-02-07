import MainEditContactPage from "@/components/editContact/MainEditContactPage";

const getContactById = async (id) => {
  const response = await fetch(`https://jsonplaceholder.ir/users/${id}`, {
    method: "GET",
    next: {
      revalidate: 10,
    },
  });

  const data = await response.json();
  
  return data;
};

const EditContact = async ({params:{id}}) => {
  const data = await getContactById(id);

  return <MainEditContactPage data={data}/>;
};

export default EditContact;
