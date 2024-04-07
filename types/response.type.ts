import { UpdateWriteOpResult } from 'mongoose';
import { AuthResponseType } from './auth.type';
import { TopicType } from './topic.type';
import { UserType } from './user.type';

export type DataResponseType = {
  status: number;
  message: string;
  success: boolean;
  data:
    | UserType[]
    | UserType
    | TopicType[]
    | TopicType
    | AuthResponseType
    | UpdateWriteOpResult
    | null;
};

export type DataType =
  | UserType[]
  | UserType
  | TopicType[]
  | TopicType
  | UpdateWriteOpResult
  | AuthResponseType
  | null;
