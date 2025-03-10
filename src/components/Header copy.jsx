import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaMapMarkerAlt, FaInfoCircle, FaPhone, FaBook, FaUser, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../contex/AuthContext";

const Header = ({ onSearchClick }) => {
  const { logdata, setlogData, path, setPath } = useContext(AuthContext);
  const [searchtext, setSeachtext] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (logdata === "Logout") {
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
  };
  return (
    <div className="container">
      <h2>OccasionVerse</h2>
      <div className="navabr-container">
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

        <div className="item-list">
          <Link to={"/"}>
            <AiFillHome /> Home
          </Link>
          <Link to={"/Venue"}>
            <FaMapMarkerAlt /> Venue
          </Link>
          <a>
            <FaInfoCircle /> About
          </a>
          <a>
            <FaPhone /> Contact
          </a>
          <a>
            <FaBook /> My Booking
          </a>
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
