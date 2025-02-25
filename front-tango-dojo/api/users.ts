import api from "./axiosInstance";

export const getUsers = async () => {
  const response = await api.get("/users");
  console.log(response.data);
  return response.data;
};
