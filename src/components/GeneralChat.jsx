import ScrollToBottom from "react-scroll-to-bottom";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useTokenContext } from "../context/TokenContext";

export default function GeneralChat({ receiver, receiverId, show }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const { token, id } = useTokenContext();
  const topicId = Math.min(id, receiverId) + "-" + Math.max(id, receiverId);

  const getMessages = async () => {
    const params = {
      senderId: id,
      receiverId,
    };

    const queryString = new URLSearchParams(params).toString();

    const url = `http://localhost:8080/api/v1/message?${queryString}`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getMessages();

    const socket = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(socket);
    setStompClient(stomp);

    stomp.connect(
      {},
      () => {
        stomp.subscribe(`/topic/chat/${topicId}`, (payload) => {
          const body = JSON.parse(payload.body);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              senderId: body.senderId,
              content: body.content,
              firstName: body.firstName,
              lastName: body.lastName,
              time: body.time,
            },
          ]);

          console.log("Received message content:", body.content);
        });
      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      stomp.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    setMessage("");

    if (message) {
      var chatMessage = {
        senderId: id,
        receiverId: receiverId,
        content: message,
        type: "CHAT",
      };

      stompClient.send(`/app/chat/${topicId}`, {}, JSON.stringify(chatMessage));

      await fetch("http://localhost:8080/api/v1/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chatMessage),
      });
    }
  };

  const renderedMessages = messages.map((m) => {
    return (
      <div
        key={m.time}
        className={`mb-2 flex ${
          id == m.senderId ? "justify-end ml-20 md:mr-4" : "mr-20"
        }`}
      >
        <div
          className={`${
            id == m.senderId
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-lg py-2 px-4 text-pretty max-w-60 break-words`}
        >
          {m.content}
        </div>
      </div>
    );
  });
  return (
    <div
      className={`${
        show == null ? "hidden" : "block"
      }block bg-white rounded-xl w-full`}
    >
      <div className="p-4 border-b bg-blue-500 text-white rounded-xl md:rounded-tr-xl flex justify-between items-center">
        <div className="text-lg font-semibold">{receiver}</div>
      </div>
      <ScrollToBottom className="p-4 h-[62vh] overflow-x-hidden" id="chatbox">
        {renderedMessages}
      </ScrollToBottom>

      <div className="p-4 border-t flex">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          autoComplete="off"
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Type a message"
          className="w-full px-3 py-2 border rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
