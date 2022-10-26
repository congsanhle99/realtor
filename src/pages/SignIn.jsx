import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        toast.success("Sign in was Success!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  };

  return (
    <section className="px-4 sm:px-14">
      <div className="h-[90vh] flex items-center ">
        <div className="h-[400px] md:w-[50%] hidden sm:block">
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_q5pk6p1k.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="w-full md:w-[67%] lg:w-[500px]">
          <h1 className="text-4xl font-semibold pb-12">Sign In</h1>
          <form className="space-y-8" onSubmit={onSubmit}>
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
            <div className="relative">
              <input
                className="w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <div className="sm:flex items-center justify-between whitespace-nowrap text-sm md:text-base gap-4">
              <p>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-red-400 hover:text-red-600 transition">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className="text-blue-400 hover:text-blue-600 transition">
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-300 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              sign in
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

export default SignIn;
