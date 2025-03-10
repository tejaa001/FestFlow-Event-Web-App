import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="user-info">
          <div className="avatar">T</div>
          <h2>Tejas Bhalerao</h2>
        </div>
        <nav>
          <ul>
            <li>My Orders</li>
            <li className="active">Profile Information</li>
            <li>Manage Addresses</li>
            <li>PAN Card Information</li>
            <li>Gift Cards <span className="balance">₹0</span></li>
            <li>Saved UPI</li>
            <li>Saved Cards</li>
          </ul>
        </nav>
      </div>
      <div className="profile-content">
        <h2>Personal Information <span className="edit">Edit</span></h2>
        <div className="input-group">
          <input type="text" value="Tejas" readOnly />
          <input type="text" value="Bhalerao" readOnly />
        </div>
        <div className="gender">
          <label>Your Gender:</label>
          <input type="radio" name="gender" disabled /> Male
          <input type="radio" name="gender" disabled /> Female
        </div>
        <h2>Email Address <span className="edit">Edit</span></h2>
        <input type="email" value="tejasbhalerao85@gmail.com" readOnly />
        <h2>Mobile Number <span className="edit">Edit</span></h2>
        <input type="text" value="+918793228225" readOnly />
      </div>
    </div>
  );
};

export default Profile;