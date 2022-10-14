import React from "react";
import spinner from "../assets/spinner.svg";

function Spinner() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black opacity-40 z-50">
      <div className="">
        <img src={spinner} alt="loading" className="h-24" />
      </div>
    </div>
  );
}

export default Spinner;
