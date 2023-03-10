import axios from "axios";

export type contactType = {
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

const URL = process.env.NEXT_PUBLIC_API_URL!;

export const signInService = async (email: string, password: string) => {
  return await axios.post(URL + "/signIn", { email, password });
};

export const loginService = async (email: string, password: string) => {
  return await axios.post(URL + "/login", { email, password });
};

export const getPaginatedContactsService = async (
  token: string,
  page: number = 0
) => {
  return await axios.get(`${URL}/contacts?page=${page}`, {
    headers: {
      "x-authentication-token": token,
    },
  });
};

export const getContactsForSearchService = async (
  token: string,
  search?: "true"
) => {
  return await axios.get(`${URL}/contacts?search=${search}`, {
    headers: {
      "x-authentication-token": token,
    },
  });
};

export const getSingleContactService = async (
  token: string,
  contactId: string
) => {
  return await axios.get(`${URL}/contact/${contactId}`, {
    headers: {
      "x-authentication-token": token,
    },
  });
};

export const addContactService = async (
  token: string,
  data: {
    fullname: string;
    phone: string;
    email: string;
    job: string;
    image: string;
  }
) => {
  return await axios.post(`${URL}/addContact`, data, {
    headers: { "x-authentication-token": token },
  });
};

export const editContactService = async (
  token: string,
  contactId: string,
  data: {
    fullname: string;
    phone: string;
    email: string;
    job: string;
    image: string;
  }
) => {
  return await axios.put(`${URL}/editContact/${contactId}`, data, {
    headers: { "x-authentication-token": token },
  });
};

export const deleteContactService = async (
  token: string,
  contactId: string
) => {
  return await axios.delete(`${URL}/deleteContact/${contactId}`, {
    headers: { "x-authentication-token": token },
  });
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
