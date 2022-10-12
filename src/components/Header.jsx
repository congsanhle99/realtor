import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathMathRoute = (route) => {
    if (route === location.pathname) return true;
  };
  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <header className="flex items-center justify-between px-4 max-w-7xl mx-auto">
        <div>
          <img
            className="h-5 cursor-pointer"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`py-3 text-md font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
                pathMathRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 text-md font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
                pathMathRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 text-md font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
                pathMathRoute("/sign-in") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
