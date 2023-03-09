import { ObjectId } from "mongodb";
import client from "../databaseClient/client";

export interface UserCollectiontype {
  email: string;
  password: string;
  contacts: {
    _id: ObjectId;
    fullname: string;
    job: string;
    email: string;
    phone: string;
    image: string;
  }[];
}

export default client
  .db("contactManager")
  .collection<UserCollectiontype>("users");
