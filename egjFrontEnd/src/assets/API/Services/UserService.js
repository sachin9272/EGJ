import axios from "axios";

const BASE_URL = "https://egj-back-end.vercel.app/api/v1/users/";

export const getUser = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}${id}`, {
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
