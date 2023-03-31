import mongoose, { Model } from "mongoose";

export interface UserModelType extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  resetPassAmount: number;
  contacts?: {
    _id: mongoose.Types.ObjectId;
    fullname: string;
    job?: string;
    phone: string;
    email?: string;
    image?: string;
  }[];
}

interface UserModel extends Model<UserModelType> {}

const userSchema = new mongoose.Schema<UserModelType, UserModel>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetPassAmount: { type: Number, required: true, default: 0 },
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
