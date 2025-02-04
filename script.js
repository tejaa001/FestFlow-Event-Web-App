import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Home from "./src/screens/Home";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import VenuePage from "./src/screens/VenuePage";
import Error from "./src/components/Error";
import Header from "./src/components/Header";
import VenueDetails from "./src/components/VenueDetails";
import { NetworkProvider } from "./src/contex/ConnectionContex";
import HomeDetails from "./src/components/HomeDetails";
import LoginPage from "./src/screens/LoginPage";

const Div = document.querySelector(".root");
const root = ReactDOM.createRoot(Div);

const RenderApp = () => {
  let [searchtext, setSeachtext] = useState("");
  let [mediaData,setMediaData] = useState([])
  
  const onSearchClick = (str) => {
    setSeachtext(str);
  };
  // console.log(mediaData);
  
  return (
    <>
      <Header onSearchClick={onSearchClick} />
      <Outlet context={{ searchtext,setMediaData,mediaData}} />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RenderApp />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/venue",
        element: <VenuePage />,
        errorElement: <Error />,
      },
      {
        path: "/venue-detail/:venueId",
        element: <VenueDetails />,
        errorElement: <Error />,
      },
      {
        path: "/home-detail/:homeId",
        element: <HomeDetails />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <Error />,
      }
      
    ],
    
  },
  // {
  //   path: "/login",
  //   element: <LoginPage/>,
  //   errorElement: <Error />,
  // }
 
]);

root.render(
  <NetworkProvider>
    <RouterProvider router={router} />
  </NetworkProvider>
);
