import { NextApiRequest } from "next";

export interface CustomNextRequest extends NextApiRequest {
  query: {
    page?: string;
    search?: "false" | "true";
    _id?: string;
  };
  headers: {
    "x-authentication-token": string;
  };
  body: {
    user: {
      email: string;
    };
  };
}

export interface CustomAddContactRequest extends CustomNextRequest {
  body: {
    user: {
      email: string;
    };
    fullname: string;
    image: string;
    phone: string;
    email: string;
    job: string;
  };
}
