import { AuthResponseType } from './auth.type';
import { UserType } from './user.type';

export type DataResponseType = {
  status: number;
  message: string;
  success: boolean;
  data: UserType[] | UserType | AuthResponseType | null;
};

export type DataType = UserType[] | UserType | AuthResponseType | null;
