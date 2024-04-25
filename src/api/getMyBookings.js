
export async function getMyBookings(token) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch("http://localhost:8080/api/v1/booking", {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.bookings;
  } catch (error) {
    console.error("Error:", error);
  }
}
