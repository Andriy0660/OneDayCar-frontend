import { useState } from "react";
import { Link } from "react-router-dom";
import { useTokenContext } from "../../context/TokenContext";

export default function MyCarModal({
  car,
  show,
  disableModal,
  changeCarDisability,
  isDisabledCar,
}) {
  const { token } = useTokenContext();
  const [isLoading, setIsLoading] = useState(false);

  const enable = async () => {
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const params = {
      id: car.id,
      enable: isDisabledCar,
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/car?${queryString}`,
        {
          method: "PATCH",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsLoading(false);
      changeCarDisability();
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="m-4 sm:w-96 md:w-1/3 lg:w-1/3 xl:w-1/3 bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="max-h-[70vh] overflow-auto rounded-3xl scrollbar-hide">
                <div className="overflow-hidden">
                  <img
                    className="rounded-t-3xl"
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnN8ZW58MHx8MHx8fDA%3D"
                    alt=""
                  />
                </div>
                <div className="px-5 pt-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {car.vendor} {car.model} {car.year}
                    </h5>
                  </a>

                  <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
                    {car.location}
                  </p>
                  <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
                    {car.carType}
                  </p>

                  <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
                    {car.description}
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${car.priceForDay}
                  </p>
                </div>
              </div>
              <button
                onClick={disableModal}
                type="button"
                className="my-2.5 ml-2.5 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-2.5 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Close
              </button>
              <Link
                to={`/myCarBookings?carId=${car.id}&token=${token}&vendor=${car.vendor}&model=${car.model}`}
              >
                <button
                  type="button"
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg textbase px-2.5 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  Bookings
                </button>
              </Link>
              {isDisabledCar ? (
                <button
                  type="button"
                  onClick={enable}
                  className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-2.5 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Activate
                </button>
              ) : (
                <button
                  type="button"
                  onClick={enable}
                  className={`text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-base px-2.5 py-1 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Deactivate
                </button>
              )}
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
