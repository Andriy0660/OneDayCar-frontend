import { defer } from "react-router-dom";
import { getMyCars } from "../../api/getMyCars";


export async function myCarsLoader({request}) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const cars = getMyCars(token);
  return defer({ cars });
}
