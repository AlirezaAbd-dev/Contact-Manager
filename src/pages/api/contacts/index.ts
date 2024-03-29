import { NextApiResponse } from "next";

import { CustomNextRequest } from "../../../../types";
import contacts from "../../../serveruUtils/controllers/contacts";

const handler = async (req: CustomNextRequest, res: NextApiResponse) => {
  try {
  } catch (err) {
    return res
      .status(500)
      .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
  }

  if (req.method === "GET") {
    await contacts(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
