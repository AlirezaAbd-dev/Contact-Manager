import MainContactPage from "@/components/contacts/MainContactPage";

const getData = async () => {
  const response = await fetch("https://jsonplaceholder.ir/users", {
    method: "GET",
    next: {
      revalidate: 30,
    },
  });

  const data =await response.json()

  return data
};

const Contacts = async () => {
const data= await getData()

  return <MainContactPage data={data} />;
};

export default Contacts;
