import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

const USERS_URL = `${API_BASE_URL}users/`;

export const getUser = async (id, token) => {
  try {
    const response = await axios.get(`${USERS_URL}${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching User's Data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};
