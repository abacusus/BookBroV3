import React, { useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="w-1/2 hidden lg:flex items-center justify-center bg-gray-100">
        <img src={Image} alt="Illustration" className="w-3/4 h-auto object-contain" />
      </div>

      {/* Right side login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Logo" className="h-12" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-gray-500 mt-1">Please enter your details</p>
          </div>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember for 30 days
              </label>
              <a href="https://www.google.com" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
              >
                <img src={GoogleSvg} alt="Google" className="w-5 h-5" />
                Sign In with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
