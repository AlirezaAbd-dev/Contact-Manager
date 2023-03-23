import { ObjectId } from "mongodb";
import client from "../databaseClient/client";

export interface UserCollectiontype {
  email: string;
  password: string;
  resetPassAmount: number;
  contacts: {
    _id: ObjectId;
    fullname: string;
    job: string | undefined;
    email: string | undefined;
    phone: string;
    image: string | undefined;
  }[];
}

export default client
  .db("contactManager")
  .collection<UserCollectiontype>("users");
