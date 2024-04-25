import { defer } from "react-router-dom";
import { getMyBookings } from "../../api/getMyBookings";

export async function myBookingsLoader({ request }) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const bookings = getMyBookings(token);
  return defer({ bookings });
}
