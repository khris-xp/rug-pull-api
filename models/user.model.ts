import mongoose from 'mongoose';
import { UserType } from '../types/user.type';
const { Schema } = mongoose;

const userSchema = new Schema<UserType>(
  {
    firstName: { type: String, trim: true, max: 64, required: true },
    lastName: { type: String, trim: true, max: 64, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String, required: true },
    pictureProfile: {
      type: String,
      default:
        'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg',
      required: true,
    },
    age: { type: Number, required: true },
    role: { type: String, default: 'User', required: true },
    point: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserType>('User', userSchema);

export default User;
