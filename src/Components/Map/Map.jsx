import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";

// import { fetchDataCountries } from "../../api";

const token =
  "pk.eyJ1IjoiaGF5dGFtIiwiYSI6ImNrYTV6dGZpODAyM2Uycmw3dWRodWRtN3oifQ.qB0Yu6fhTwKTdjfCuouCnw";
function Map() {
  const [viewport, setViewport] = useState({
    latitude: 27,
    longitude: 16,
    width: "100vw",
    height: "100vh",
    zoom: 2,
  });
  const [countriesData, setCountriesData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const url = "https://corona.lmao.ninja/v2/countries";
      const {
        data: [
          {
            countryInfo: { lat, long, flag },
          },
        ],
      } = await axios.get(url);

      // console.log(countriesData)s;
      setCountriesData({ lat, long, flag });
    };
    fetchAPI();
  }, []);
  console.log(countriesData.lat + "" + countriesData.long);

  return (
    <div>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/dark-v10"
        {...viewport}
        mapboxApiAccessToken={token}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {countriesData.length ? (
          <Marker latitude={countriesData.lat} longitude={countriesData.long}>
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fmarker&psig=AOvVaw3uCsL49Ctjuop_D0qgo2Cn&ust=1589567726778000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIi07Zz_s-kCFQAAAAAdAAAAABADs"
              alt="zaeaze"
            />
          </Marker>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
