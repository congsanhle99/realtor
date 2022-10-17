import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update displayName in firebase auth
        await updateProfile(auth.currentUser, { displayName: name });

        // update name in fireStore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name });
      }
      toast.success("Profile detail is updated!");
    } catch (error) {
      toast.error("Could not update the profile detail!");
    }
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
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-blue-200 ring-blue-200"
              }`}
            />
            <div className="text-gray-600 font-semibold text-lg ">Email</div>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-gray-100 border border-gray-300 rounded transition ease-in-out cursor-not-allowed"
            />

            <div className="flex justify-between whitespace-nowrap">
              <p className="flex items-center justify-between">
                Do you want change your name?{" "}
                <span
                  className="ml-2 bg-blue-500 text-white font-medium px-6 py-2 rounded border border-blue-500 hover:text-blue-700 hover:bg-transparent transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prev) => !prev);
                  }}
                >
                  {changeDetail ? "Save Change" : "Edit"}
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase font-medium rounded px-7 py-3 text-sm shadow-md hover:bg-blue-700 transition duration-300 ease-in-out hover:shadow-lg active:bg-blue-800 mt-4"
          >
            <Link to="/create-listing" className="flex justify-center items-center">
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or rent home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
