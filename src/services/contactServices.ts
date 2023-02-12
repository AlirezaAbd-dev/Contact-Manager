import axios from "axios";

type contactType = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  address: {
    country: string;
    city: string;
    street: string;
    alley: string;
    number: number;
    geo: [object];
  };
  phone: string;
  website: string;
  company: string;
};

export const getContactById = async (id: number): Promise<contactType> => {
  return await axios
    .get(`https://jsonplaceholder.ir/users/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};

export const getAllContacts = async (): Promise<contactType[]> => {
  return await axios
    .get("https://jsonplaceholder.ir/users")
    .then((res) => res.data)
    .catch((err) => console.log(err.message));
};
