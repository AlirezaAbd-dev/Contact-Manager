import mongoose from "mongoose";

export interface UserModelType {
  email: string;
  password: string;
  resetPassAmount: number;
  contacts: {
    fullname: string;
    job: string;
    phone: string;
    email: string;
    image: string;
  }[];
}

const userSchema = new mongoose.Schema<UserModelType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetPassAmount: { type: Number, required: true },
  contacts: [
    {
      fullname: { type: String, required: true },
      job: { type: String, required: false },
      phone: { type: String, required: true },
      email: { type: String, required: false },
      image: { type: String, required: false },
    },
  ],
});

const UserModel =
  mongoose.models.users || mongoose.model<UserModelType>("users", userSchema);

export default UserModel;
