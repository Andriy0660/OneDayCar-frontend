import { useState } from "react";
import MyCarModal from "./MyCarModal";

export default function MyCar({ car }) {
  const [showModal, setShowModal] = useState(false);
  const [isDisabledCar, setIsDisabledCar] = useState(car.isDisabled);
  const changeCarDisability = () => {
    setIsDisabledCar(!isDisabledCar);
  };
  return (
    <div
      onClick={() => {
        setShowModal(!showModal);
        showModal === true
          ? document.body.classList.remove("overflow-hidden")
          : document.body.classList.add("overflow-hidden");
      }}
      className="m-4 sm:w-96 md:w-1/4 lg:w-1/4 xl:w-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        className="w-screen rounded-t-lg"
        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnN8ZW58MHx8MHx8fDA%3D"
        alt=""
      />
      <div className="p-5">
        {isDisabledCar ? (
          <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
            <h2 className="text-sm font-normal">Disabled</h2>
          </div>
        ) : (
          <div className="inline-flex items-center px-3 py-1 text-blue-500 rounded-full gap-x-2 bg-blue-100/60 dark:bg-blue-800">
            <h2 className="text-sm font-normal">Active</h2>
          </div>
        )}

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
      <MyCarModal
        car={car}
        show={showModal}
        disableModal={() => setShowModal(false)}
        changeCarDisability={changeCarDisability}
        isDisabledCar={isDisabledCar}
      />
    </div>
  );
}
