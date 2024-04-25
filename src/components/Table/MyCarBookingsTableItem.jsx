import { useState } from "react";
import RenterInfoModal from "../MyCar/RenterInfoModal";
import { useTokenContext } from "../../context/TokenContext";

export default function MyCarBookingsTableItem({ booking }) {
  const [showModal, setShowModal] = useState(false);
  const [heightOfModal, setHeightOfModal] = useState(0);

  const { token } = useTokenContext();
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [status, setStatus] = useState(booking.status);

  const accept = async () => {
    setIsAcceptLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const params = {
      bookingId: booking.id,
      status: "ACCEPTED",
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/booking/setStatus?${queryString}`,
        {
          method: "PATCH",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsAcceptLoading(false);
      setStatus("ACCEPTED");
    } catch (error) {
      console.error("Error:", error);
      setIsAcceptLoading(false);
    }
  };

  const reject = async () => {
    setIsRejectLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const params = {
      bookingId: booking.id,
      status: "REJECTED",
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/booking/setStatus?${queryString}`,
        {
          method: "PATCH",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsRejectLoading(false);
      setStatus("REJECTED");
    } catch (error) {
      console.error("Error:", error);
      setIsRejectLoading(false);
    }
  };

  let renderedStatus;
  switch (status) {
    case "DONE":
      renderedStatus = (
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
      renderedStatus = (
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
      renderedStatus = (
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
      renderedStatus = (
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <button
            type="button"
            onClick={accept}
            className={`text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-xl text-sm px-2.5 py-1 text-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 ${
              isAcceptLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={reject}
            className={`text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-2.5 py-1 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 ${
              isRejectLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Reject
          </button>
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
        {booking.startDate}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {booking.endDate}
      </td>
      {renderedStatus}
    </tr>
  );
}
