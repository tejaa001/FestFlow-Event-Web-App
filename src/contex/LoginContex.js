// import { createContext } from "react";
// import useOnlineStaus from "../hooks/onlineStaus";

// export const NetworkContext = createContext();

// export const NetworkProvider = ({ children }) => {
//   const OnlineStaus = useOnlineStaus();
//   return (
//     <NetworkContext.Provider value={{ OnlineStaus }}>
//       {!Login ? (<div className="NoConnection">
//           <h1>⚠</h1>
//           <h2>अरे मंद बुद्धि मानुस तेरा नेट गया है !!</h2>
//           <p>
//             This Display has a connection to your network but no connection to
//             the internet.
//           </p>
//           <p class="desc">
//             The connection to the outside world is needed for updates and
//             keeping the time.
//           </p>
//         </div>) : " "}
//         {children}
//     </NetworkContext.Provider>
//   );
// };
