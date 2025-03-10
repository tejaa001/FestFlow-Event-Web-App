import React, { useContext, useEffect, useRef, useState } from "react";
import { RawURL } from "../data";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import { AuthContext } from "../contex/AuthContext";

const LoginPage = () => {
  const { setlogData} = useContext(AuthContext);
  const [number, setnumber] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpVarified, setisOtpVarified] = useState("");
  const [newAcc, setNewAcc] = useState(false);
  const [isRegisted,setisRegisted] = useState(false);
  const navigate = useNavigate();

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phonepattern = /^[0-9]{10}$/;

    if (!phonepattern.test(number)) {
      seterrorMsg("Please Enter a Valid 10 Digit Number");
      return;
    }

    try {
      const response = await fetch(`${RawURL}/user/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNo: number,
        }),
      });

      const data = await response.json();
      let ootp = data.data.otp;
      // console.log(ootp);
      console.log(data);
      console.log(data.data.isRegistered);
      if(data.data.isRegistered === 1){
        console.log("true");
        
        setisRegisted(true);
        console.log(isRegisted);
      }
      
      if (data.code === 200) {
        setShowOtp(true);
        window.alert(`${ootp}`);
      }
        console.log(isRegisted);
        
        if(isRegisted){
          // navigate("/login");
          console.log(isRegisted);
          
        }else{
          console.log(isRegisted);
        }
      
    } catch (error) {
      console.log("error", error);
    }
  };

  const verifyOtp = async () => {
    let strOtp = otp.join("");
    try {
      const response = await fetch(`${RawURL}/user/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNo: number,
          otp: strOtp,
        }),
      });
      const data = await response.json();
      
      setisOtpVarified(data.message);
      localStorage.setItem('accessToken',data.data.accessToken)

      console.log("code", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlenumberChange = (e) => {
    setnumber(e.target.value);
    seterrorMsg("");
  };

  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const onNewAccClick = () => {
    setNewAcc(true);
  };

  if (isOtpVarified == "OTP verified Successfully") {
    setlogData("Logout");
    navigate(`/`);
  }

  return (
    <div className="login-container">
      <div className="left"></div>
      {newAcc ? (
        <SignUp newAcc={setNewAcc} />
      ) : (
        <div className="right">
          <>
            <h2>{"LOGIN"}</h2>
            <input
              className="input-type"
              type="text"
              placeholder="Number"
              value={number}
              onChange={handlenumberChange}
            />
            {errorMsg && <p className="error">{errorMsg}</p>}
            <button onClick={handleSubmit} className="btn">
              Request OTP
            </button>
            <Link onClick={onNewAccClick}>
              <p className="loginlinks">
                New to FestFlow? Create an account
              </p>
            </Link>
          </>
          {showOtp && (
            <div className="verifyOptDiv">
              <p>OTP sent to {number}, Please enter the OTP</p>
              <div className="input_div">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="otpinput"
                  />
                ))}
              </div>
              <button onClick={verifyOtp} className="btn">
                Verify OTP
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
