import { apiGet } from "./axiosIntance";

export const getTours = async () => {
  const response = await apiGet("/tour");
  // response.data is { success: true, data: [...] }
  // return the array itself
  return response.data.data; //data from the response and data from my API
};
