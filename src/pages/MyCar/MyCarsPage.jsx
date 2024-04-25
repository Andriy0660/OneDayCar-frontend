import { useState } from "react";
import Header from "../../components/Header";
import ListOfMyCars from "../../components/MyCar/ListOfMyCars";
import AddCarModal from "../../components/MyCar/AddCarModal";
import { Await, useLoaderData } from "react-router-dom";
import React from "react";

export default function MyCarsPage() {
  const data = useLoaderData();
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  return (
    <div>
      <Header />
      <button
        onClick={() => setShowAddCarModal(true)}
        type="button"
        className="ml-16 mt-4 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        Add Car
      </button>
      <AddCarModal
        showCarModal={showAddCarModal}
        disableModal={() => {
          setShowAddCarModal(false);
        }}
      />
      <React.Suspense
        fallback={
          <div className="text-center mt-16 text-xl font-semibold text-blue-600/100 dark:text-blue-500/100">
            Loading your cars...
          </div>
        }
      >
        <Await resolve={data.cars}>
          {(cars) => {
            if (cars.length === 0) {
              return (
                <div className="text-center mt-16 text-xl font-semibold text-blue-600/100 dark:text-blue-500/100">
                  There are no cars here.. Add a car!
                </div>
              );
            }
            return <ListOfMyCars cars={cars} />;
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}
