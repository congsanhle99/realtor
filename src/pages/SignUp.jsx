import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      const user = userCredential.user;
      // 55' 3-vid2
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was Success!");
      setTimeout(() => {
        navigate("/");
      }, 1 * 1000);
    } catch (error) {
      toast.error("Something went wrong with the registration!");
    }
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
          <h1 className="text-4xl font-semibold pb-12">Sign Up</h1>
          <form className="space-y-8" onSubmit={onSubmit}>
            <div className="">
              <input
                className="w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                id="name"
                type="text"
                value={name}
                onChange={onChange}
                placeholder="Full Name"
              />
            </div>
            <input
              className="w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              id="email"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="example@gmail.com"
            />
            <div className="relative">
              <input
                className="w-full px-4 py-2 text-base text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onChange}
                placeholder="Your Password"
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
            <div className="flex items-center justify-between whitespace-nowrap text-sm md:text-base gap-4">
              <p>
                You have an account?{" "}
                <Link to="/sign-in" className="text-red-400 hover:text-red-600 transition">
                  Sign In
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
              sign up
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

export default SignUp;
