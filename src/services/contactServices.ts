import axios from "axios";

export interface SearchContact {
  contacts: {
    _id: string;
    fullname: string;
  }[];
}
export interface Contact {
  _id: string;
  fullname: string;
  email?: string;
  phone: string;
  job?: string;
  image?: string;
}
export interface ContactsPaginatedType {
  contacts: Contact[];
  pagesNumber: number;
}

export const signInService = async (email: string, password: string) => {
  return await axios.post("/api/signIn", { email, password });
};

export const loginService = async (email: string, password: string) => {
  return await axios.post("/api/login", { email, password });
};

// `/api/contacts?page=${pageQuery || 1}`
export const getPaginatedContactsFetcher = ([url, token]: [
  string,
  string
]): Promise<ContactsPaginatedType> | null => {
  if (token) {
    return axios
      .get(url, {
        headers: {
          "x-authentication-token": token,
        },
      })
      .then((res) => res.data);
  } else {
    return null;
  }
};

// `/api/contacts?search=${search}`
export const getContactsForSearchFetcher = ([url, token]: [
  url: string,
  token: string
]): Promise<SearchContact> | null => {
  if (token) {
    return axios
      .get(url, {
        headers: {
          "x-authentication-token": token,
        },
      })
      .then((res) => res.data);
  } else {
    return null;
  }
};

// `/api/contact/${contactId}`
export const getSingleContactFetcher = ([url, token]: [
  string,
  string
]): Promise<{
  contact: Contact;
}> | null => {
  if (token) {
    return axios
      .get(url, {
        headers: {
          "x-authentication-token": token,
        },
      })
      .then((res) => res.data);
  } else {
    return null;
  }
};

// `/api/contact`
export const addContactMutation = (
  [url, token]: [string, string | undefined],
  {
    arg: data,
  }: {
    arg: {
      fullname: string;
      phone: string;
      email?: string;
      job?: string;
      image?: string;
    };
  }
): Promise<Contact> | null => {
  if (token) {
    return axios
      .post(url, data, {
        headers: { "x-authentication-token": token },
      })
      .then((res) => res.data);
  } else {
    return null;
  }
};

// `/api/contact/${contactId}`
export const editContactMutation = (
  [url, token]: [string, string],
  {
    arg: data,
  }: {
    arg: {
      fullname: string;
      phone: string;
      email?: string;
      job?: string;
    };
  }
) => {
  if (token) {
    return axios.put(url, data, {
      headers: { "x-authentication-token": token },
    });
  } else {
    return null;
  }
};

// `/api/contact/:contactId`
export const deleteContactMutation = ([url, token]: [string, string]) => {
  if (token) {
    return axios.delete(url, {
      headers: { "x-authentication-token": token },
    });
  } else {
    return null;
  }
};

export const uploadImageMutation = (
  [url, token]: [string, string],
  { arg }
) => {
  if (token) {
    return axios.post(url, arg, {
      headers: {
        "x-authentication-token": token,
      },
    });
  } else {
    return null;
  }
};
