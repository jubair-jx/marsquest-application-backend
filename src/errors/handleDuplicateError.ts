import httpStatus from "http-status";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleDuplicateError = (err: any) => {
  return {
    statusCode: httpStatus.CONFLICT,
    message: `${err.meta.target[0]} is already exist, please change it`,
    errorMessage: `${err.meta.target[0]} is already exist, please change it`,
  };
  // const errorMessage = err.message;
  // const regex = /"(.*?)"/;
  // const match = errorMessage.match(regex);
  // if (match) {
  //   const value = match[1];
  //   return {
  //     statusCode: httpStatus.CONFLICT,
  //     message: "Already Exist",
  //     errorMessage: `${value} is already exist`,
  //   };
  // } else {
  //   return {
  //     statusCode: httpStatus.CONFLICT,
  //     message: "Already Exist",
  //     errorMessage: `Value is already exist`,
  //   };
  // }
};
