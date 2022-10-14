import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <section className="max-w-6xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center mt-6 font-bold uppercase tracking-wider">My Profile</h1>
        <div className="w-full md:w-[60%] mt-6 px-6 md:px-10 ">
          <form action="" className="space-y-4">
            <div className="text-gray-600 font-semibold text-lg">Full Name</div>
            <input
              type="text"
              id="name"
              value={name}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />
            <div className="text-gray-600 font-semibold text-lg ">Email</div>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap">
              <p className="flex items-center justify-between">
                Do you want change your name?{" "}
                <span className="ml-2 bg-blue-500 text-white font-medium px-6 py-2 rounded border border-blue-500 hover:text-blue-700 hover:bg-transparent transition duration-300 ease-in-out cursor-pointer">
                  Edit
                </span>
              </p>
              <p
                className="capitalize bg-red-500 text-white font-medium px-6 py-2 rounded border border-red-500 hover:text-red-600 hover:bg-transparent transition duration-300 ease-in-out cursor-pointer"
                onClick={onLogout}
              >
                sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
