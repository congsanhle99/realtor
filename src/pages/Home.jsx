import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
import { db } from "../firebase";

function Home() {
  // offer
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingRef = collection(db, "listings");
        // create query
        const q = query(listingRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4));
        // execute query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  // Place for RENT
  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingRef = collection(db, "listings");
        // create query
        const q = query(listingRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4));
        // execute query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  // SALE
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingRef = collection(db, "listings");
        // create query
        const q = query(listingRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(4));
        // execute query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      <Slider className="overflow-auto scrollbar-hide" />
      {/* Offers */}
      <div className="max-w-7xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent Offers</h2>
            <Link to="/offers">
              <p className="px-3 text-md text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
        {/* Rent */}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Places for Rent</h2>
            <Link to="/category/rent">
              <p className="px-3 text-md text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                Show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
        {/* Sale */}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Places for Sale</h2>
            <Link to="/category/sale">
              <p className="px-3 text-md text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                Show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
