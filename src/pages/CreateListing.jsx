import React, { useState } from "react";

function CreateListing() {
  const [formData, setformData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;
  const onChange = () => {};

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6">Create Listing</h1>
      <form action="">
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            id="type"
            value="sale"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              type === "sale" ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}
            onClick={onChange}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="sale"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              type === "rent" ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}
            onClick={onChange}
          >
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          maxLength="32"
          minLength="10"
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <div className="flex items-center space-x-3">
          <div className="">
            <p className="font-semibold">Beds</p>
            <input
              required
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onchange}
              min="1"
              max="50"
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div className="">
            <p className="font-semibold">Baths</p>
            <input
              required
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onchange}
              min="1"
              max="50"
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking Sport</p>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            id="type"
            value={true}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            id="furnished"
            value={true}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          required
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Address"
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
        />
        <p className="text-lg mt-6 font-semibold">Description</p>
        <textarea
          required
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg font-semibold">Offer</p>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            id="offer"
            value={true}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold mt-6">Regular price</p>
            <div className="flex w-full items-center justify-center space-x-6">
              <input
                required
                type="number"
                id="regularPrice"
                value={regularPrice}
                min="50"
                max="4000000000"
                className={
                  "w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600  text-center"
                }
                onChange={onChange}
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$/Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Discounted price</p>
              <div className="flex w-full items-center justify-center space-x-6">
                <input
                  required={offer}
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  min="50"
                  max="4000000000"
                  className={
                    "w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600  text-center"
                  }
                  onChange={onChange}
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">$/Month</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">The first image will be the cover (max 6)</p>
          <input
            type="file"
            id="images"
            onchange={onChange}
            accept=".jpg, .png, .jpeg"
            multiple
            required
            className="w-full px-3 py-5 text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg active:scale-95 transition duration-300 ease-in-out"
        >
          create Listing
        </button>
      </form>
    </main>
  );
}

export default CreateListing;
