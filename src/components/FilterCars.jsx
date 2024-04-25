import { useState } from "react";

export default function FilterCars({ setFilterParams }) {
  const [showFilters, setShowFilters] = useState(false);

  const [vendor, setVendor] = useState(null);
  const [carType, setCarType] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [vendorError, setVendorError] = useState(false);
  const [carTypeError, setCarTypeError] = useState(false);
  const [maxPriceError, setMaxPriceError] = useState(false);

  const isEnabled = !vendorError && !carTypeError && !maxPriceError;

  const handleVendorChange = (e) => {
    const vendor = e.target.value;
    setVendorError(false);

    if (!/^[A-Za-zА-Яа-я]+$/.test(vendor) && vendor.length !== 0) {
      setVendorError(true);
    }

    vendor.length === 0 ? setVendor(null) : setVendor(vendor);
  };
  const handleCarTypeChange = (e) => {
    const carType = e.target.value;
    setCarTypeError(false);

    if (!/^[A-Za-zА-Яа-я]+$/.test(carType) && carType.length !== 0) {
      setCarTypeError(true);
    }

    carType.length === 0 ? setCarType(null) : setCarType(carType);
  };
  const handleMaxPriceChange = (e) => {
    const maxPrice = e.target.value;
    setMaxPriceError(false);

    if (!/^\d*\.?\d*$/.test(maxPrice)) {
      setMaxPriceError(true);
    }
    maxPrice.length === 0 ? setMaxPrice(null) : setMaxPrice(maxPrice);
  };
  return (
    <div className="flex justify-center items-center">
      {showFilters ? (
        <>
          <form className="flex justify-start ml-12 mt-2">
            <div className="relative z-0 w-36 mb-5 group mx-5">
              <input
                type="text"
                value={vendor}
                onChange={handleVendorChange}
                id="vendor"
                autoComplete="off"
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer ${
                  vendorError
                    ? "border-red-300 dark:border-red-600 dark:focus:border-red-500 focus:border-red-600"
                    : "border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="vendor"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Vendor
              </label>
            </div>
            <div className="relative z-0 w-36 mb-5 group mx-5">
              <input
                type="text"
                value={carType}
                onChange={handleCarTypeChange}
                id="carType"
                autoComplete="off"
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  carTypeError
                    ? "border-red-300 dark:border-red-600 dark:focus:border-red-500 focus:border-red-600"
                    : "border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="carType"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Car Type
              </label>
            </div>
            <div className="relative z-0 w-36 mb-5 group mx-5">
              <input
                type="text"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                id="maxPrice"
                autoComplete="off"
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  maxPriceError
                    ? "border-red-300 dark:border-red-600 dark:focus:border-red-500 focus:border-red-600"
                    : "border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="maxPrice"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Max price for day
              </label>
            </div>
          </form>
          <button
            disabled={!isEnabled}
            onClick={() => {
              setShowFilters(false);
              setFilterParams({
                vendor,
                carType,
                maxPrice,
              });
            }}
            type="button"
            className={`h-8 ml-16 px-8 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-2.5 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${
              !isEnabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            OK
          </button>
        </>
      ) : (
        <button
          onClick={() => setShowFilters(!showFilters)}
          type="button"
          className="h-8 px-12 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Filter
        </button>
      )}
    </div>
  );
}
