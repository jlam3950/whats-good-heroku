import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateRestaurantList } from "../redux/nearbyRestaurantsSlice";
import { PacmanLoader } from "react-spinners";
import RestaurantCard from "./RestaurantCard";
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";
let googleKey = process.env.REACT_APP_GOOGLE_KEY;

const Search = () => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [restList, setRestList] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const dispatch = useDispatch();
  const inputAddress = useRef();

  const handleAddress = () => {
    setHasSearched(true);
    const typedAddress = inputAddress.current.value;
    if (typedAddress === "") return;

    const calledAddress = typedAddress
      .replaceAll(" ", "+")
      .replaceAll("/[.,#!$%^&*;:{}=-_`~()]/", "");

    fetch("https://jefflwhatsgood.herokuapp.com/getLocationWithAddress", {
      method: "POST",
      body: JSON.stringify({ address: calledAddress }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setRestList(response);
        saveRestaurantList(response);
        setUserAddress(typedAddress);
      });
  };

  const saveRestaurantList = (list) => {
    dispatch(updateRestaurantList(list));
  };

  const getLocation = async (e) => {
    setHasSearched(true);
    try {
      e.preventDefault();
      console.log("clicked");
      fetchAPI();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleAddress();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  },);

  const fetchAPI = () => {
    if (lat === "" && long === "") {
      alert("location data loading, click search once map has loaded");
    }

    if (lat !== "") {
      console.log("fetching");
      fetch("/getLocation", {
        method: "POST",
        body: JSON.stringify({ lat: lat, long: long }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setRestList(response);
          saveRestaurantList(response);
        });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position?.coords?.latitude);
      setLong(position?.coords?.longitude);
    });
  }, []);

  //googleMapAPI

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleKey,
  });

  const MapLoad = () => {
    if (!isLoaded) return <div>Loading...</div>;
    else if (isLoaded) {
      return <Map />;
    }
  };

  const GeoCode = () => {
    const location = userAddress;
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: googleKey,
        },
      })
      .then((response) => {
        setLat(response?.data?.results[0].geometry.location.lat);
        setLong(response?.data?.results[0].geometry.location.lng);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  GeoCode();

  function Map() {
    const [activeMarker, setActiveMarker] = useState("");
    const handleActiveMarker = (marker) => {
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
    };

    return (
      <GoogleMap
        zoom={12}
        // zoom was set at 15. 
        center={{ lat: lat, lng: long }}
        onClick={() => setActiveMarker(null)}
        mapContainerClassName="map-container"
      >
        {restList.map((restaurants, index) => {
          return (
            <Marker
              key={index}
              animation={2}
              onClick={() => handleActiveMarker(index)}
              position={{
                lat: restaurants.coordinates.latitude,
                lng: restaurants.coordinates.longitude,
              }}
            >
              {activeMarker === index ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    {restaurants.name}
                    <br></br>
                    {restaurants.phone}
                    <br></br>
                    {`Rating: ${restaurants.rating}`}
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          );
        })}
      </GoogleMap>
    );
  }
console.log(hasSearched)
  return (
    <>
    <div className = 'h-screen'>
      <div className= "container flex flex-col md:items-center px-4 mx-auto mt-2 md:space-y-0">
        <div className="flex flex-col mx-auto md:flex-row">
          <div className="flex justify-center items-center">
            <div className="flex space-x-1">
              <input
                type="text"
                ref={inputAddress}
                className="block w-full px-5 py-1 text-purple-700 bg-white border rounded-lg focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 searchBar"
                placeholder="Enter Zip Code or Address, City, and State"
              />
              <button
                onClick={handleAddress}
                className="px-4 text-white bg-green-500 hover:bg-green-700 borderborder-blue-700 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={getLocation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-1 px-4 border border-blue-700 rounded"
          >
            { lat === '' ? "Location data loading...": "What's good around me?" }
          </button>
        </div>
      </div>
      <div className="container mx-auto md:mt-2">
        <div className="flex flex-col md:flex-row justify-center">
          <div className={ !hasSearched ? "hidden": "container overflow-y-auto h-1/12 rounded sm:max-w-xl md:ml-0 md:mt-4 md:w-2/4 md:h-screen md:flex md:flex-col md:items-center card_container"} >
            {restList.map((restData) => {
              return <RestaurantCard id={restData.ID} props={restData} />;
            })}
          </div>
          <div className={ !hasSearched ? "container map_load_container w-3/4 items-center rounded md:mt-6 px-4 md:h-screen" : "container h-1/2 items-center rounded md:mt-6 md:w-1/2 px-4 md:h-screen"}>
            {lat !== "" ? (
              <MapLoad />
            ) : (

              <div className="container flex flex-col justify-center items-center rounded h-1/2 mt-10">
                <PacmanLoader color="#f8ffd0" size={30} />{" "}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Search;
