import { useState } from "react";
import CarModal from "./CarModal";

export default function Car({ start, end, car }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="m-4 w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="w-screen rounded-t-lg"
        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnN8ZW58MHx8MHx8fDA%3D"
        alt=""
      />
      <div
        className="p-5 cursor-pointer"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {car.vendor}
        </h5>

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {car.model}
        </h5>
        <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
          {car.year}
        </p>
        <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
          {car.location}
        </p>
        <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
          {car.carType}
        </p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          ${car.priceForDay}
        </p>
      </div>
      <CarModal
        start={start}
        end={end}
        car={car}
        show={showModal}
        disableModal={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
}
