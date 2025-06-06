/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const error: TError = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Email or Registration Number',
    error,
  };
};

export default handleDuplicateError;
