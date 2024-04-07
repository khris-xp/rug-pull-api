import { Response } from 'express';

export const handleError = (res: Response, err: Error | unknown) => {
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  } else {
    const error = err as Error;
    return res
      .status(500)
      .json({ message: error.message || 'An unknown error occurred.' });
  }
};
