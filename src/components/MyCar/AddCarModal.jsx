import axios from "axios";
import { useState } from "react";
import { useTokenContext } from "../../context/TokenContext";

export default function AddCarModal({ showCarModal, disableModal }) {
  const { token } = useTokenContext();

  const [vendor, setVendor] = useState("");
  const [model, setModel] = useState("");
  const [carType, setCarType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(2024);
  const [priceForDay, setPriceForDay] = useState(50);

  const [vendorError, setVendorError] = useState(null);
  const [modelError, setModelError] = useState(null);
  const [carTypeError, setCarTypeError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [priceForDayError, setPriceForDayError] = useState(null);
  const [yearError, setYearError] = useState(null);
  const [addCarError, setAddCarError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const isEnabled =
    !vendorError &&
    !modelError &&
    !carTypeError &&
    !descriptionError &&
    !locationError &&
    !priceForDayError &&
    !yearError &&
    vendor &&
    model &&
    carType &&
    location &&
    description &&
    priceForDay &&
    year;

  const handleVendorChange = (event) => {
    const value = event.target.value;
    setVendorError(null);
    if (!/^[A-Za-zА-Яа-я]+$/.test(value) && value.length !== 0) {
      setVendorError("Vendor must contains letters only");
    }
    setVendor(value);
  };

  const handleModelChange = (event) => {
    const value = event.target.value;
    setModel(value);
  };

  const handleCarTypeChange = (event) => {
    const value = event.target.value;
    setCarTypeError(null);
    if (!/^[A-Za-zА-Яа-я]+$/.test(value) && value.length !== 0) {
      setCarTypeError("CarType must contains letters only");
    }
    setCarType(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleYearChange = (event) => {
    const value = parseInt(event.target.value);
    setYearError(null);
    if (isNaN(value)) {
      setYear(0);
      return;
    }
    if (value < 1990 || value > 2024) {
      setYearError("Year must be between 1990 and 2024");
    }
    setYear(value);
  };

  const handlePriceForDayChange = (event) => {
    const value = parseInt(event.target.value);
    setPriceForDayError(null);
    if (isNaN(value)) {
      setPriceForDay(0);
      return;
    }
    if (value <= 0) {
      setPriceForDayError("Price must be a positive number");
    }
    setPriceForDay(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddCarError(null);
    const addCarRequest = {
      vendor,
      model,
      carType,
      location,
      year,
      priceForDay,
      description,
    };
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      await axios.post("http://localhost:8080/api/v1/car", addCarRequest, {
        headers,
      });

      window.location.reload();
    } catch (error) {
      setAddCarError("An error occured. Please reload page and try again.");
      console.error("Помилка додавання авто:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showCarModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="flex flex-col items-center justify-center m-4 sm:w-96 md:w-1/3 lg:w-1/3 xl:w-1/3 bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
              <form onSubmit={handleSubmit} className="w-full">
                <h1 className="text-center my-2 text-2xl font-semibold text-gray-800 sm:text-3xl dark:text-white">
                  Add Car
                </h1>
                <div className="m-2">
                  <input
                    type="text"
                    value={vendor}
                    onChange={handleVendorChange}
                    className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      vendorError
                        ? "dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                        : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                    }
                    `}
                    placeholder="Vendor"
                  />
                </div>
                {vendorError && (
                  <div className="m-2 text-red-500 text-xs italic">
                    {vendorError}
                  </div>
                )}
                <div className="m-2">
                  <input
                    type="text"
                    value={model}
                    onChange={handleModelChange}
                    className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      modelError
                        ? "dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                        : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                    }
                    `}
                    placeholder="Model"
                  />
                </div>
                {modelError && (
                  <div className="m-2 text-red-500 text-xs italic">
                    {modelError}
                  </div>
                )}

                <div className="m-2">
                  <span className="absolute"></span>
                  <input
                    type="text"
                    value={carType}
                    onChange={handleCarTypeChange}
                    className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      carTypeError
                        ? "dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                        : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                    }
                    `}
                    placeholder="Car Type"
                  />
                </div>
                {carTypeError && (
                  <div className="m-2 text-red-500 text-xs italic">
                    {carTypeError}
                  </div>
                )}

                <div className="m-2">
                  <span className="absolute"></span>
                  <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      locationError
                        ? "dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                        : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                    }
                    `}
                    placeholder="Location"
                  />
                </div>
                {locationError && (
                  <div className="m-2 text-red-500 text-xs italic">
                    {locationError}
                  </div>
                )}

                <div className="m-2">
                  <span className="absolute"></span>
                  <input
                    type="text"
                    value={year}
                    onChange={handleYearChange}
                    className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      yearError
                        ? "dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                        : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                    }
                    `}
                    placeholder="Year"
                  />
                </div>
                {yearError && (
                  <div className="m-2 text-red-500 text-xs italic">
                    {yearError}
                  </div>
                )}

                <div className="m-2">
                  <span className="absolute"></span>
                  <input
                    type="text"
                    value={priceForDay}
                    onChange={handlePriceForDayChange}
                    className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      priceForDayError
                        ? "dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                        : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                    }
                    `}
                    placeholder="Price For Day"
                  />
                </div>
                {priceForDayError && (
                  <div className="m-2 text-red-500 text-xs italic">
                    {priceForDayError}
                  </div>
                )}

                <div className="m-2">
                  <textarea
                    id="message"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={4}
                    className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      descriptionError
                        ? "dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                        : "dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                    }
                    `}
                    placeholder="Description..."
                  ></textarea>
                </div>
                {descriptionError && (
                  <div className="m-2 text-red-500 text-xs italic">
                    {descriptionError}
                  </div>
                )}
                <div>
                  <button
                    onClick={disableModal}
                    type="button"
                    className="mx-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isEnabled}
                    className={`m-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${
                      !isEnabled || isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                    `}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      "Add Car"
                    )}
                  </button>
                </div>
                {addCarError && (
                  <div className="text-center text-red-500 text-lg italic">
                    {addCarError}
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
