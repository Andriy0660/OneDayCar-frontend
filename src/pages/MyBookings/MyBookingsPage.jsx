import { Await, useLoaderData } from "react-router-dom";
import Header from "../../components/Header";
import MyBookingsTable from "../../components/MyBookingsTable/MyBookingsTable";
import React from "react";

export default function MyBookingsPage() {
  const data = useLoaderData();
  return (
    <React.Suspense
      fallback={
        <div className="text-center mt-16 text-xl font-semibold text-blue-600/100 dark:text-blue-500/100">
          Loading your bookings...
        </div>
      }
    >
      <Await resolve={data.bookings}>
        {(bookings) => {
          return (
            <div>
              <Header />
              <MyBookingsTable bookings={bookings} />
            </div>
          );
        }}
      </Await>
    </React.Suspense>
  );
}
