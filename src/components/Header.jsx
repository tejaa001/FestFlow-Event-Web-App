import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaMapMarkerAlt, FaInfoCircle, FaPhone, FaBook, FaUser, FaUserPlus, FaSignOutAlt,FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../contex/AuthContext";
// import logo from '../Logo.png'; 

const Header = ({ onSearchClick }) => {
  const { logdata, setlogData, path, setPath } = useContext(AuthContext);
  const [searchtext, setSeachtext] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();


  let accessToken = localStorage.getItem("accessToken");
  if (accessToken != null) {
    accessToken = true
  }
  useEffect(() => {
    if (logdata === "Logout" || accessToken) {
      setIsLogin(true);
      setProfile("Profile");
    } else {
      setIsLogin(false);
      setProfile("");
    }
  }, [logdata]);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    setlogData("Login")
    setDropdownOpen(false);
    accessToken = false
    localStorage.clear();
  };
  
  return (
    <div className="container">
      <div className="navabr-container">
        <div className="item-list">
          <p>FestFlow</p>
        <div className="search-bar">
          <input
            type="text"
            id="input"
            placeholder="Enter your event name"
            value={searchtext}
            onChange={(e) => setSeachtext(e.target.value)}
          />
          <span className="search" onClick={() => onSearchClick(searchtext)}>
            Search
          </span>
        </div>
          <Link to={"/"}>
            <AiFillHome /> Home
          </Link>
          <Link to={"/Venue"}>
            <FaMapMarkerAlt /> Venue
          </Link>
          <Link>
            <FaInfoCircle /> About
          </Link>
          <Link to={"/upcomingEvent"}>
          <FaCalendarAlt /> Upcoming Bookings
          </Link>
          <Link>
            <FaBook /> My Booking
          </Link>
          {isLogin ? (
            <div className="profile-dropdown">
              <span onClick={toggleDropdown} className="profile-link">
                <FaUser /> {profile}
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <a onClick={handleProfileClick}>
                    <FaUser /> Profile
                  </a>
                  <a onClick={handleLogoutClick}>
                    <FaSignOutAlt /> Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <Link to={`/${path}`} >
              <FaUser /> {logdata}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
