import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ onSearchClick }) => {
  let [logdata, setlogData] = useState("Login");
  let [path, setPath] = useState("login");

  let [searchtext, setSeachtext] = useState("");

  const Logout = () => {
    if (logdata === "Logout") {
      setlogData("Login");
      setPath("login");
    } else {
      setlogData("Logout");
      setPath("");
    }
  };
  
  return (
    <div className="container">
      <h1>OccasionVerse</h1>
      <div className="navabr-container">
        <div className="search-bar">
          <input
            type="text"
            id="input"
            placeholder="Enter your event name"
            value={searchtext}
            onChange={(e) => setSeachtext(e.target.value)}
          ></input>
          <span className="search" onClick={() => onSearchClick(searchtext)}>
            Search
          </span>
        </div>

        <div className="item-list">
          <Link to={"/"}>Home</Link>
          <Link to={"/Venue"}>Venue</Link>
          <a>About</a>
          <span>Contact</span>
          <span>My Booking</span>
          <Link to={`/${path}`} onClick={Logout}>{logdata}</Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
