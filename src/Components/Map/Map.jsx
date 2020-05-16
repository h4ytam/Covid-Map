import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 27,
    longitude: 16,
    width: "100vw",
    height: "100vh",
    zoom: 2,
  });
  const [countriesData, setCountriesData] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      const url = "https://corona.lmao.ninja/v2/countries";
      const { data } = await axios.get(url);
      const modifiedData = data.map((dataInfo) => ({
        country: dataInfo.country,
        countryInfoLat: dataInfo.countryInfo.lat,
        countryInfoLong: dataInfo.countryInfo.long,
        countryFlag: dataInfo.countryInfo.flag,
        cases: dataInfo.cases,
        todayCases: dataInfo.todayCases,
        deaths: dataInfo.deaths,
        todayDeaths: dataInfo.todayDeaths,
        recovered: dataInfo.recovered,
        active: dataInfo.active,
        tests: dataInfo.tests,
      }));
      setCountriesData(modifiedData);
    };
    fetchAPI();
  }, []);
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/dark-v10"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {countriesData.length
          ? countriesData.map(
              ({
                countryInfoLat,
                countryInfoLong,
                country,
                recovered,
                todayCases,
                cases,
                active,
                tests,
                countryFlag,
                deaths,
                todayDeaths,
              }) => (
                <Marker
                  key={country}
                  latitude={countryInfoLat}
                  longitude={countryInfoLong}
                >
                  <i
                    className="fas fa-circle circle"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCountry({
                        countryInfoLat,
                        countryInfoLong,
                        todayCases,
                        cases,
                        active,
                        tests,
                        recovered,
                        country,
                        countryFlag,
                        deaths,
                        todayDeaths,
                      });
                      // console.log(selectedCountry);
                    }}
                  />
                </Marker>
              )
            )
          : null}
        {/* {selectedCountry ? console.log(selectedCountry.recovered) : null} */}
        {selectedCountry ? (
          <Popup
            onClose={() => {
              setSelectedCountry(null);
            }}
            latitude={selectedCountry.countryInfoLat}
            longitude={selectedCountry.countryInfoLong}
          >
            <div className="popupInfo">
              <h2 className="tests">Test:{selectedCountry.tests}</h2>
              <h6 className="active">Active:{selectedCountry.active}</h6>
              <h5 className="recoverd">Recoverd:{selectedCountry.recovered}</h5>
              <h5 className="deaths">Deaths:{selectedCountry.deaths}</h5>
              <h5 className="todayCases">
                TodayCases:{selectedCountry.todayCases}
              </h5>
              <h5 className="todayDeaths">
                TodayDeaths:{selectedCountry.todayDeaths}
              </h5>
              <img
                className="Countryflag"
                src={selectedCountry.countryFlag}
                alt=""
              />
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
