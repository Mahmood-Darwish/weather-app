import React, { useState, useContext, useEffect } from "react";
import { weatherApiKey } from "../../env";
import { database } from "../firebase-config";
import { ref, push, set, onValue } from "firebase/database";
import { authContext } from "../auth";

export default function Cities() {
    const [city, setCity] = useState(null);
    const [cities, setCities] = useState([]);
    // const [citiesFormatted, setCitiesFormatted] = useState([])
    const useAuth = useContext(authContext);

    const handleSubmission = async function (e) {
        e.preventDefault();
        try {
        const response = await fetch(
            `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
        }
        );
        console.log(response.json());
        console.log(useAuth.user.uid);
    } catch (error) {
        console.error(error);
          return;
      }
      const citiesListRef = ref(database, "cities/" + useAuth.user.uid);
      const newCityRef = push(citiesListRef);
      set(newCityRef, {
        city,
    });
    };

    const setUp = async function () {
      let data;
      const citiesListRef = ref(database, "cities/" + useAuth.user.uid);
      let newCities = [];
      onValue(
          citiesListRef,
          (snapshot) => {
              const process = async (data) => {
                  //   data = snapshot.val();
                  for (const id_tag in data) {
                      for (const city in data[id_tag]) {
                  console.log(data[id_tag][city]);
                  newCities.push(data[id_tag][city]);
                  newCities = [...new Set(newCities)];
                  // setCities((cities) => { return [...cities, data[id_tag][city]] })
                  // setCities((cities) => { return [...new Set(cities)] })
              }
          }
                const citiesPromises = newCities.map(async (city) => {
                    const cityResponse = await requestCity(city);
                    return cityResponse;
                });
                const citiesForamtted = (
                    await Promise.allSettled(citiesPromises)
                ).map((cityPromise) => {
                    if (cityPromise.status === "fulfilled") {
                        return cityPromise.value;
                    }
                    return {};
                });
                console.log("citiesForamtted", citiesForamtted);
                setCities(citiesForamtted);
            };

            process(snapshot.val());
        },
        function (error) {
            console.error(error);
      }
      );
  };

    useEffect(() => {
        setUp();
    }, []);

    const requestCity = async function (cityToRequest) {
      console.log("cityToRequest", cityToRequest);
      var jsonResponse;
      const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${cityToRequest}&appid=${weatherApiKey}&units=metric`,
          {
              method: "POST",
              headers: { "Content-Type": "application/json" },
          }
      );
      jsonResponse = await response.json();
      console.log(jsonResponse);
      console.log(useAuth.user.uid);
      return jsonResponse;
  };

    return (
        <div>
            <form onSubmit={handleSubmission}>
                <label>
                    <p>Add city to monitor: </p>
                  <input
                      onChange={(e) => setCity(e.target.value.toLowerCase())}
                      value={city == null ? "" : city}
                  />
              </label>
              <div>
                  <button type="submit">Submit</button>
              </div>
          </form>
          <div>
              {cities.map((city, index) => {
                  return <div key={index}>{city.name}</div>;
              })}
          </div>
      </div>
  );
}
