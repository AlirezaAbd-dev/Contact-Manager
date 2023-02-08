import axios from "axios"

export const getContactById = async (id) => {
    return await axios.get(`https://jsonplaceholder.ir/users/${id}`).then(res => res.data).catch(err => console.log(err.message))
};

export const getAllContacts = async () => {
    return await axios.get("https://jsonplaceholder.ir/users").then(res => res.data).catch(err => console.log(err.message))
};
