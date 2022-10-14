import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Header() {
  const [pageState, setPageState] = useState("Sign In");
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
      </header>
    </div>
  );
}

export default Header;
