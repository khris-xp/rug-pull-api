import { UpdateWriteOpResult } from 'mongoose';
import { AuthResponseType } from './auth.type';
import { BoardGameType, CommonBoardGameType } from './board-game';
import { CategoryType } from './category.type';
import { RoomType } from './room.type';
import { StatusType } from './status.type';
import { TableType } from './table.type';
import { TopicType } from './topic.type';
import { UploadType } from './upload.type';
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
    | CategoryType[]
    | CategoryType
    | StatusType[]
    | StatusType
    | TableType[]
    | TableType
    | RoomType[]
    | RoomType
    | CommonBoardGameType
    | BoardGameType
    | AuthResponseType
    | UpdateWriteOpResult
    | UploadType
    | null;
};

export type DataType =
  | UserType[]
  | UserType
  | TopicType[]
  | TopicType
  | CategoryType[]
  | CategoryType
  | StatusType[]
  | StatusType
  | TableType[]
  | TableType
  | RoomType[]
  | RoomType
  | CommonBoardGameType
  | BoardGameType
  | UpdateWriteOpResult
  | AuthResponseType
  | UploadType
  | null;
