import { Response } from 'express';

export const handleError = (
  status: number,
  res: Response,
  err: Error | unknown
) => {
  if (err instanceof Error) {
    return res.status(status).json({ message: err.message });
  } else {
    const error = err as Error;
    return res
      .status(500)
      .json({ message: error.message || 'An unknown error occurred.' });
  }
};
