import { NextApiRequest } from "next";

export interface CustomNextRequest extends NextApiRequest {
    headers: {
      "x-authentication-token": string;
    };
    body: {
      user: {
        email: string;
      };
    };
  }