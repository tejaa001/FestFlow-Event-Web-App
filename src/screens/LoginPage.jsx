import { useState } from "react";
import { RawURL } from "../data";

const LoginPage = () => {

  const [number, setnumber] = useState("");
  const [errorMsg, seterrorMsg] = useState('');
  const [showOtp, setShowOtp] = useState(false);


  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const response = await fetch(`${RawURL}/user/send-otp`,{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          mobileNo: number,
        }),
      });

      const data = await response.json();
    
      if(data.code === code){
        setShowOtp(true)
      }

    } catch (error) {
      console.log("error", error);
    } 

  }

  const verifyOtp = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${RawURL}/user/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNo: number,
          // otp,
        }),
      });

      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setShowOtp(true);
    }
  };
  const handlenumberChange = (e) => {
    setnumber(e.target.value);
    seterrorMsg('')
  };

  const handleOtpChange = (e) => {
    setShowOtp(e.target.value);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
    <div class="login-container">
      <div class="left">
        <h2>Login</h2>
        <p>Get access to your Orders, Wishlist, and Recommendations</p>
      </div>
      <div class="right">
        <input type="text" id="login-input" value={number} onChange={(e)=> setnumber(e.target.value)} required placeholder="Enter Email/Mobile Number" />
        <span type="submit" href="#" class="request-otp">
          Request OTP
        </span>
      </div>
    </div>
    </form>
  );
};
export default LoginPage;
