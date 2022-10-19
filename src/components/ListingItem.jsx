import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationOn } from "react-icons/md";

function ListingItem({ listing, id }) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-300 mt-6">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          src={listing.imgUrls[0]}
          alt="images item"
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-300 ease-in"
          loading="lazy"
        />
        <Moment
          fromNow
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px] space-y-2">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">{listing.address}</p>
          </div>
          <p className="font-semibold text-lg truncate">{listing.name}</p>
          <p className="text-[#457b9d] text-lg font-semibold">
            $
            {listing.offer
              ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && "/month"}
          </p>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-sm">{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}</p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-sm">{listing.bathrooms > 1 ? `${listing.bedrooms} Baths` : "1 Bath"}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ListingItem;
