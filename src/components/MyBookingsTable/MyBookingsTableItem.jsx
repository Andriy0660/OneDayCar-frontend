import { useState } from "react";
import RenterInfoModal from "../MyCar/RenterInfoModal";

export default function MyBookingsTableItem({ booking }) {
  const [showModal, setShowModal] = useState(false);
  const [heightOfModal, setHeightOfModal] = useState(0);
  let status;
  switch (booking.status) {
    case "DONE":
      status = (
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="text-sm font-normal">Done</h2>
          </div>
        </td>
      );
      break;
    case "ACCEPTED": {
      status = (
        <td className="px-4 py-4 text-sm font-medium text-blue-700 whitespace-nowrap">
          <div className="inline-flex items-center px-3 py-1 text-blue-500 rounded-full gap-x-2 bg-blue-100/60 dark:bg-blue-800">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>

            <h2 className="text-sm font-normal">Accepted</h2>
          </div>
        </td>
      );
      break;
    }
    case "REJECTED": {
      status = (
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="text-sm font-normal">Rejected</h2>
          </div>
        </td>
      );
      break;
    }
    case "CREATED": {
      status = (
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
            <span className="h-1.5 w-1.5 bg-gray-500"></span>

            <h2 className="text-sm font-normal">Created</h2>
          </div>
        </td>
      );
      break;
    }
  }
  return (
    <tr>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <div
            className="hover:cursor-pointer"
            onClick={(event) => {
              console.log(window.screen.height);
              console.log(event);
              const h =
                event.clientY > window.screen.height * 0.6
                  ? event.clientY - 160
                  : event.clientY + 30;
              setHeightOfModal(h);
              setShowModal(true);
            }}
          >
            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
              {booking.firstName} {booking.lastName}
            </h2>
            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
              {booking.email}
            </p>
          </div>

          <RenterInfoModal
            booking={booking}
            heightOfModal={heightOfModal}
            disableModal={() => {
              setShowModal(false);
            }}
            show={showModal}
          />
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {booking.fullPrice}$
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {booking.vendor} {booking.model}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {booking.startDate}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {booking.endDate}
      </td>
      {status}
    </tr>
  );
}
