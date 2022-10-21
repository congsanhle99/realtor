import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, where("type", "==", params.categoryName), orderBy("timestamp", "desc"), limit(8));
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listingsQ = [];
        querySnap.forEach((doc) => {
          return listingsQ.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listingsQ);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing!");
      }
    };
    fetchListings();
  }, [params.categoryName]);

  // if (loading) {
  //   return <Spinner />;
  // }

  const onFetchMoreListing = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listingsQ = [];
      querySnap.forEach((doc) => {
        return listingsQ.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prev) => [...prev, ...listingsQ]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listing!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">
        {params.categoryName === "rent" ? "Place for Rent" : "Place for Sale"}
      </h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {listings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} />
              ))}
            </ul>
          </main>
          {lastFetchListing && (
            <div className="flex items-center justify-center">
              <button
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 hover:scale-105 rounded transition duration-300 ease-in-out"
                onClick={onFetchMoreListing}
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current Category</p>
      )}
    </div>
  );
}

export default Category;
