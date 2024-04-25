import axios from "axios";

export async function getMyCars(token) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get("http://localhost:8080/api/v1/car/owned", {
      headers,
    });
    return response.data.cars;
  } catch (error) {
    console.error("Помилка діставання машин:", error);
    return [];
  }
}
