import { NextApiResponse } from "next";
import fs from "fs";

const createReadStream = (path: string, res: NextApiResponse) => {
  const fileStream = fs.createReadStream(path);
  fileStream.on("error", (err) => {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  });
  return fileStream;
};

export default createReadStream;
