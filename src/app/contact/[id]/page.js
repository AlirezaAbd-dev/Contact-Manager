import MainViewContactPage from "@/components/viewContact/MainViewContactPage";

const getContactById = async ({ id }) => {
  const response = await fetch(`https://jsonplaceholder.ir/users/${id}`, {
    method: "GET",
    next: {
      revalidate: 10,
    },
  });

  const data = await response.json();

  return data;
};

const ViewContact = async ({ params }) => {
  const data = await getContactById(params);

  return <MainViewContactPage contact={data} />;
};

export default ViewContact;
