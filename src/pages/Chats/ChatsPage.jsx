import { useState } from "react";
import Header from "../../components/Header";
import { useLoaderData } from "react-router-dom";
import GeneralChat from "../../components/GeneralChat";

export default function ChatsPage() {
  const chatMembers = useLoaderData();
  const [choosenChat, setChoosenChat] = useState({
    id: null,
    firstName: null,
    lastName: null,
  });
  console.log(chatMembers);

  const renderedChatMembers = chatMembers.map((m) => {
    return (
      <div
        key={m.id}
        onClick={() =>
          setChoosenChat({
            id: m.id,
            firstName: m.firstName,
            lastName: m.lastName,
          })
        }
        className={`flex flex-row py-4 px-4 items-center hover:bg-blue-100 hover:cursor-pointer border-t-2 ${
          m.id == choosenChat.id ? "border-l-4 border-blue-400" : ""
        }`}
      >
        <div className="w-full">
          <div className="text-lg font-semibold">
            {m.firstName} {m.lastName}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <div className="mt-8 border-2 rounded-xl mx-4 md:mx-20 ">
        <button
          type="button"
          onClick={() => {
            setChoosenChat({
              id: null,
              firstName: null,
              lastName: null,
            });
          }}
          className={`${
            choosenChat.id == null ? "hidden" : "block"
          }  md:hidden text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-tl-lg text-base px-2.5 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800
            }`}
        >
          Назад
        </button>
        <div className="rounded-xl h-[80vh] flex justify-between bg-white">
          <div
            className={`${
              choosenChat.id != null ? "hidden" : "block"
            } w-full md:block flex flex-col md:w-2/5 xl:w-1/5 border-r-2 overflow-y-auto scrollbar-hide`}
          >
            <div className="text-center my-2 text-2xl font-medium text-gray-900 dark:text-white">
              All Chats
            </div>
            {renderedChatMembers}
          </div>
          {choosenChat.id == null ? (
            <div
              className={`hidden md:block md:flex justify-center items-center w-full`}
            >
              <div className="text-2xl font-medium text-gray-900 dark:text-white italic">
                Choose Chat...
              </div>
            </div>
          ) : (
            <GeneralChat
              receiver={`${choosenChat.firstName} ${choosenChat.lastName}`}
              receiverId={choosenChat.id}
              show={choosenChat.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
