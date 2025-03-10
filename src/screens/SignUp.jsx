import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../contex/AuthContext';

const SignUp = ({ newAcc }) => {
    const { setlogData, setaccessToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cityId: '',
        mobileNo: '',
        profileImage: null
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('email', formData.email);
        data.append('cityId', formData.cityId);
        data.append('mobileNo', formData.mobileNo);
        if (formData.profileImage) {
            data.append('profileImage', formData.profileImage);
        }

        try {
            const response = await fetch('http://108.174.58.176:4000/user/signup', {
                method: 'POST',
                body: data
            });
            const Rdata = await response.json();
            setaccessToken(data.accessToken)
            console.log(Rdata);
            if (response.ok) {

                alert('Signup successful');
                setlogData("Logout");
                navigate(`/`);
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    const onLoginCick = () => {
        newAcc(false)
    }

    return (
        <div className="right">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="title">SIGNUP</h1>
                <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} className="input" required />
                <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} className="input" required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" required />
                <input name="cityId" type="text" placeholder="City ID" onChange={handleChange} className="input" required />
                <input name="mobileNo" type="text" placeholder="Mobile Number" onChange={handleChange} className="input" required />
                <input type="file" onChange={handleFileChange} className="input" required />
                <button type="submit" className="submit-btn">Signup</button>
                <Link onClick={onLoginCick}>
                    <p className='loginlinks' >Existing User? Log in</p>
                </Link>
            </form>
        </div>
    )
}

export default SignUp;