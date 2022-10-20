import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data!");
      }
    };
    getLandlord();
  }, [userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 mt-3 mb-6 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-700"
            ></textarea>
          </div>
          <a
            type="button"
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
            className="w-full px-7 py-3 mb-6 bg-blue-600 text-white rounded text-sm uppercase shadow-sm hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg active:scale-95 text-center transition duration-300 ease-in-out"
          >
            Send message
          </a>
        </div>
      )}
    </>
  );
}

export default Contact;
