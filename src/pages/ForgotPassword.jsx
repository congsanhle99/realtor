import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section className="px-14">
      <div className="h-[90vh] flex items-center ">
        <div className="h-[400px] md:w-[50%]">
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="w-full md:w-[67%] lg:w-[500px]">
          <h1 className="text-4xl font-semibold pb-12">Forgot Password</h1>
          <form className="space-y-8">
            <div className="">
              <input
                className="w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                id="email"
                type="email"
                value={email}
                onChange={onChange}
                placeholder="example@gmail.com"
              />
            </div>

            <div className="flex items-center justify-between whitespace-nowrap text-sm md:text-base gap-4">
              <p>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-red-400 hover:text-red-600 transition">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/sign-in" className="text-blue-400 hover:text-blue-600 transition">
                  Sign In Instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-300 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Send Reset Password
            </button>
            <div className="flex items-center my-4 before:border-t before:border-gray-300 before:flex-1 after:border-t after:border-gray-300 after:flex-1">
              <p className="text-center font-semibold mx-4 uppercase">or</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
