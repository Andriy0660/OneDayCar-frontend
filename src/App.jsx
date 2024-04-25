import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import Root from "./pages/Root";
import AvailableCarsPage from "./pages/AvailableCarsPage";
import MyCarsPage from "./pages/MyCar/MyCarsPage";
import MyBookingsPage from "./pages/MyBookings/MyBookingsPage";
import AllCarRequestsPage from "./pages/AllCarRequestsPage";
import MyCarRequestsPage from "./pages/MyCarRequestsPage";
import AcceptedCarRequestsPage from "./pages/AcceptedCarRequestsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MyCarBookingsPage from "./pages/MyCarBookings/MyCarBookingsPage";
import { myCarsLoader } from "./pages/MyCar/myCarsLoader";
import { myBookingsLoader } from "./pages/MyBookings/myBookingsLoader";
import { myCarBookingsLoader } from "./pages/MyCarBookings/myCarBookingsLoader";
import ChatsPage from "./pages/Chats/ChatsPage";
import { allChatsLoader } from "./pages/Chats/allChatsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <AvailableCarsPage />,
      },
      {
        path: "/myCars",
        element: <MyCarsPage />,
        loader: myCarsLoader,
      },
      {
        path: "/myBookings",
        element: <MyBookingsPage />,
        loader: myBookingsLoader,
      },
      {
        path: "/allCarRequests",
        element: <AllCarRequestsPage />,
      },
      {
        path: "/myCarRequests",
        element: <MyCarRequestsPage />,
      },
      {
        path: "/acceptedCarRequests",
        element: <AcceptedCarRequestsPage />,
      },
      {
        path: "/signIn",
        element: <SignInPage />,
      },
      {
        path: "/signUp",
        element: <SignUpPage />,
      },
      {
        path: "/myCarBookings",
        element: <MyCarBookingsPage />,
        loader: myCarBookingsLoader,
      },
      {
        path: "/chats",
        element: <ChatsPage />,
        loader: allChatsLoader,
      },
    ],
  },
]);

async function checkTokenValidity() {
  if (window.location.href != "http://localhost:5173/signIn") {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };

    const params = {
      token,
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth?${queryString}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      window.location.href = "/signIn";
    }
  }
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function filter() {
      await checkTokenValidity();
      setLoading(false);
    }

    filter();
  }, []);

  if (loading) {
    return null;
  }

  return <RouterProvider router={router} />;
}

export default App;
