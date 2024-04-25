import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState } from "react";

export default function SearchBar({ search, isLoading, setNoCarsMessage }) {
  const [value, setValue] = useState([
    dayjs().add(1, "day"),
    dayjs().add(1, "day"),
  ]);
  const [location, setLocation] = useState("Berezhany");
  const [error, setError] = useState(null);

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setError(null);
    if (!/^[A-Za-zА-Яа-я]+$/.test(value) || value.length == 0) {
      setError("Enter location!");
    }
    setLocation(value);
  };

  const searchCars = async () => {
    const size = await search({
      startDate: value[0],
      endDate: value[1],
      location,
      page: 0,
    });
    if (size == 0) {
      setNoCarsMessage(
        <div className="text-center mt-16 text-xl font-semibold text-blue-600/100 dark:text-blue-500/100">
          There are no cars here yet..
        </div>
      );
    } else {
      setNoCarsMessage(null);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl my-4">Explore available cars!</div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
          <DateRangePicker
            format="YYYY-MM-DD"
            value={value}
            onChange={(newValue) => {
              setError(null);
              if (
                dayjs().isAfter(newValue[0]) ||
                dayjs().isAfter(newValue[1])
              ) {
                setError("Choose date correctly");
              }
              setValue(newValue);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <div className="flex flex-row justify-start items-center">
        <div className="mt-4 mr-6">Location:</div>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          className="mt-4 mx-2 bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="City"
        />
      </div>
      {error && (
        <div className="mt-2 text-center text-red-500 text-lg italic">
          {error}
        </div>
      )}
      <button
        onClick={searchCars}
        type="button"
        disabled={error}
        className={`disabled my-5 px-40 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-2.5 py-1 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${
          error || isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
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
          "Search"
        )}
      </button>
    </div>
  );
}
