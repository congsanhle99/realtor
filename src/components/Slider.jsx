import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchListing = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListing();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
              <div
                className="relative w-full h-[300px] overflow-hidden cursor-pointer"
                style={{ background: `url(${data.imgUrls[0]}) center, no-repeat`, backgroundSize: "cover" }}
              ></div>
              <p className="absolute text-[#f1faee] left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-2xl">
                {data.name}
              </p>
              <p className="flex absolute text-[#f1faee] left-1 bottom-1 font-medium max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-2xl">
                ${data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && " / month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
