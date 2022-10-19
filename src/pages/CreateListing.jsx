import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

function CreateListing() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "sale",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
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
    images,
  } = formData;
  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // File
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    }
    // text / boolean / number
    if (!e.target.files) {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted Price needs to be less than Regular Price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 images are allow");
      return;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${images.name}-${uuidv4()}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    // image
    const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch((error) => {
      setLoading(false);
      toast.error("Image not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing Created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6">Create Listing</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            id="type"
            value="sale"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              type === "rent" ? "bg-white text-black" : "bg-blue-600 text-white"
            }`}
            onClick={onChange}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-300 ease-in-out w-full ${
              type === "sale" ? "bg-white text-black" : "bg-blue-600 text-white"
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
              onChange={onChange}
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
              onChange={onChange}
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
            id="parking"
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
        {/* {!geolocationEnable && (
          <div className="flex items-center space-x-6">
            <div className="">
              <p className="text-lg font-semibold">Latitude</p>
              <input
                required
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                min="-90"
                max="90"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600  text-center"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">Longitude</p>
              <input
                required
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                min="-180"
                max="180"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600  text-center"
              />
            </div>
          </div>
        )} */}
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
                  "w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-300 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
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
            onChange={onChange}
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
