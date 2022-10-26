import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Header() {
  const [pageState, setPageState] = useState("Sign In");
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState(`Welcome ${auth.currentUser.displayName}`);
      } else {
        setPageState("Sign In");
      }
    });
  }, [auth]);

  const pathMatchRoute = (route) => {
    if (route === location.pathname) return true;
  };
  return (
    <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <header className="relative flex items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="py-4">
          <img
            className="h-5 cursor-pointer"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="hidden sm:block">
          <ul className="flex space-x-10">
            <li
              className={`py-3 text-md font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 text-md font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 text-md font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
        {/* icon */}
        <div className="sm:hidden">
          <button className="p-2 text-gray-700 rounded-md outline-none" onClick={() => setNavbar(!navbar)}>
            {navbar ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>
      {/* mobile menu */}
      <div
        className={` bg-white w-full shadow-md sm:hidden rounded-b-md top-[20px] flex flex-1 justify-center pb-3 mt-8 border-t-2 ${
          navbar ? "block" : "hidden"
        }`}
      >
        <ul className="items-center justify-center md:flex md:space-x-6 md:space-y-0">
          <li
            className={`py-3 text-md font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
              pathMatchRoute("/") && "text-black border-b-red-500"
            }`}
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className={`py-3 text-md font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
              pathMatchRoute("/offers") && "text-black border-b-red-500"
            }`}
            onClick={() => navigate("/offers")}
          >
            Offers
          </li>
          <li
            className={`py-3 text-md font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
              (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-red-500"
            }`}
            onClick={() => navigate("/profile")}
          >
            {pageState}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
