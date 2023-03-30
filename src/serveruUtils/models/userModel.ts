import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetPassAmount: { type: String, required: true },
  contacts: [
    {
      fullname: { type: String, required: true },
      job: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
});

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;
