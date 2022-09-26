import { DataMessage, FullMessage, ReturnMessage } from "./types/ResponseHandler";

export const errorHandler = (msg: string, code?: number): ReturnMessage => {
  const status = code || 400;
  return { msg, status };
};

export const successHandler = (msg: string, code?: number): ReturnMessage => {
  const status = code || 200;
  return { msg, status };
};

export const successWithData = (msg: string, data: DataMessage["data"], code?: number): FullMessage => {
  const status = code || 200;
  return { msg, data, status };
};
