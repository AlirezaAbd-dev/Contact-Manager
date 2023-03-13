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

export interface Contact {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  job: string;
  image: string;
}
export interface ContactsPaginatedType {
  contacts: Contact[];
  pagesNumber: number;
}

const URL = process.env.NEXT_PUBLIC_API_URL!;

export const signInService = async (email: string, password: string) => {
  return await axios.post("/api/signIn", { email, password });
};

export const loginService = async (email: string, password: string) => {
  return await axios.post("/api/login", { email, password });
};

export const getPaginatedContactsFetcher = ([url, token]: [string, string]) => {
  if (token) {
    return axios
      .get(url, {
        headers: {
          "x-authentication-token": token,
        },
      })
      .then((res) => res.data);
  } else {
    null;
  }
};

export const getContactsForSearchService = async (
  token: string,
  search?: "true"
) => {
  return await axios.get(`/api/contacts?search=${search}`, {
    headers: {
      "x-authentication-token": token,
    },
  });
};

export const getSingleContactService = async (
  token: string,
  contactId: string
) => {
  return await axios.get(`/api/contact/${contactId}`, {
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
  return await axios.post(`/api/contact`, data, {
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
  return await axios.put(`/api/contact/${contactId}`, data, {
    headers: { "x-authentication-token": token },
  });
};

export const deleteContactService = async (
  token: string,
  contactId: string
) => {
  return await axios.delete(`/api/contact/${contactId}`, {
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
