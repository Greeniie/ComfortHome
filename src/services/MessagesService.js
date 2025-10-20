import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

const getAll = async () => {
  const response = await API.get("/comments?_limit=10"); // dummy messages
  return response.data;
};

const getOne = async (id) => {
  const response = await API.get(`/comments/${id}`);
  return response.data;
};

export const MessagesService = {
  getAll,
  getOne,
};
