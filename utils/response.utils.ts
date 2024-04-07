import { Response } from 'express';
import { DataResponseType, DataType } from '../types/response.type';

export function successResponseStatus(
  response: Response,
  message: string,
  data: DataType
): Response {
  const dataResponse: DataResponseType = {
    status: 200,
    message: message,
    success: true,
    data: data,
  };

  return response.status(200).json(dataResponse);
}

export function errorResponseStatus(
  response: Response,
  message: string,
  data: DataType
): Response {
  const dataResponse: DataResponseType = {
    status: 400,
    message: message,
    success: false,
    data: data,
  };

  return response.status(400).json(dataResponse);
}
