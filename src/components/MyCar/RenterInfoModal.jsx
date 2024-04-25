import { useState } from "react";
import ChatModal from "../ChatModal";

export default function RenterInfoModal({
  booking,
  heightOfModal,
  show,
  disableModal,
}) {
  const [showChat, setShowChat] = useState(false);
  return (
    <>
      {show ? (
        <>
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              style={{ top: `${heightOfModal}px` }}
              id="dropdownInformation"
              className="z-10 absolute left-16 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="flex justify-end">
                <div className="mx-4 mt-1.5">Contacts</div>
                <button
                  onClick={() => {
                    disableModal();
                    setShowChat(false);
                  }}
                  type="button"
                  className="ms-auto bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-default"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="font-medium">
                  {booking.firstName} {booking.lastName}
                </div>
                <div className="font-medium truncate">{booking.email}</div>
                <div className="font-medium truncate">{booking.phone}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <button
                    onClick={() => {
                      setShowChat(true);
                    }}
                    className="block px-4 py-2"
                  >
                    Open Chat
                  </button>
                </li>
              </ul>
            </div>
            <ChatModal
              showChat={showChat}
              disableChat={() => setShowChat(false)}
              receiver={`${booking.firstName} ${booking.lastName}`}
              receiverId={booking.userId}
            />
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
