import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaBath, FaBed, FaChair, FaParking, FaShare } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import Contact from "../components/Contact";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyShareLink, setCopyShareLink] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{ background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: "cover" }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[10%] right-[2%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex items-center justify-center hover:scale-95 active:scale-105 transition duration-300"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Copied");
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      <div className="flex flex-col md:flex-row max-w-7xl lg:mx-auto rounded-lg shadow-lg bg-white lg:space-x-5 p-4 m-4">
        <div className="w-full space-y-4">
          <p className="text-2xl font-bold text-blue-900">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? "/month" : ""}
          </p>
          <p className="flex items-center font-bold">
            <MdLocationOn className="h-6 w-6 text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex items-center justify-start space-x-4">
            <p className="bg-red-900 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md mr-2">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="bg-green-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p>
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="grid grid-cols-2 gap-2 sm:flex items-center sm:space-x-10 text-sm font-semibold">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-sm sm:text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-sm sm:text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-sm sm:text-lg mr-1" />
              {+listing.parking ? "Parking Sport" : "No Parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-sm sm:text-lg mr-1" />
              {+listing.furnished > 1 ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-300 ease-in-out"
                onClick={() => setContactLandlord(true)}
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && <Contact userRef={listing.userRef} listing={listing} />}
        </div>
        {/* map but, i don't enable geocoding api :))) */}
        {/* <div className="bg-blue-300 w-full h-[200px] lg-[400px]"></div> */}
      </div>
    </main>
  );
}

export default Listing;
