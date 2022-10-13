import React from "react";
import { FcGoogle } from "react-icons/fc";

function OAuth() {
  return (
    <button className="flex items-center justify-center w-full bg-red-500 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-300 ease-in-out hover:shadow-lg active:bg-red-700">
      <FcGoogle className="text-xl bg-white rounded-full mr-3" />
      Continue with google
    </button>
  );
}

export default OAuth;
