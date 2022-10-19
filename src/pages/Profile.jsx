import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchUserListing = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
      console.log("q", q);
      const querSnap = await getDocs(q);
      console.log("querSnap", querSnap);
      let listings = [];
      querSnap.forEach((doc) => {
        console.log("doc", doc);
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log("listings", listings);
      setListings(listings);
      setLoading(false);
    };
    fetchUserListing();
  }, [auth.currentUser.uid]);

  return (
    <>
      <section className="max-w-6xl mx-auto flex flex-col items-center justify-between">
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
      <div className="max-w-7xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h1 className="text-2xl font-semibold">My Listing</h1>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {listings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
