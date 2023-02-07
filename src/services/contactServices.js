export const getContactById = async (id) => {
  const response = await fetch(`https://jsonplaceholder.ir/users/${id}`, {
    method: "GET",
    next: {
      revalidate: 10,
    },
  });

  const data = await response.json();

  return data;
};

export const getAllContacts = async () => {
  const response = await fetch("https://jsonplaceholder.ir/users", {
    method: "GET",
    next: {
      revalidate: 30,
    },
  });

  const data = await response.json();

  return data;
};
