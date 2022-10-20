import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyShareLink, setCopyShareLink] = useState(false);
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
    console.log("listing", listing);
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
    </main>
  );
}

export default Listing;
