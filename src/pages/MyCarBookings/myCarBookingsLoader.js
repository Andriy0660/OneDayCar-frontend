import { defer } from "react-router-dom";
import { getMyCarBookings } from "../../api/getMyCarBookings";

export async function myCarBookingsLoader({ request }) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const carId = searchParams.get("carId");
  const vendor = searchParams.get("vendor");
  const model = searchParams.get("model");

  const bookings = getMyCarBookings(token, carId);
  return defer({ bookings, carInfo: { vendor, model } });
}
