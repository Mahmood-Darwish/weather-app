import React, { useState, useContext, useEffect } from "react";
import { weatherApiKey } from "../../env";
import { database } from "../firebase-config";
import { ref, push, set, get, remove } from "firebase/database";
import { authContext } from "../auth";

export default function Cities() {
    const [city, setCity] = useState(null);
    const [cities, setCities] = useState([]);
    const useAuth = useContext(authContext);

    const handleSubmission = async function (e) {
        e.preventDefault();
        let cityToAdd = city.toLowerCase()
        cityToAdd = cityToAdd.replace(/\s/g, '')
        setCity(null)

        try {
            const response = await fetch(
                `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${cityToAdd}&appid=${weatherApiKey}&units=metric`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (response.status != 200) {
                console.log(response.json());
                console.log(useAuth.user.uid);
                return
            }
        } catch (error) {
            console.error(error);
            return;
        }

        let cityExists = false
        const citiesListRef = ref(database, "cities/" + useAuth.user.uid);
        await get(citiesListRef).then(
            (snapshot) => {
                const process = async (data) => {
                    for (const id_tag in data) {
                        for (const cityName in data[id_tag]) {
                            if (data[id_tag][cityName].toLowerCase().replace(/\s/g, '') == cityToAdd) {
                                cityExists = true
                                break
                            }
                        }
                    }
                }
                process(snapshot.val());
            },
            function (error) {
                console.error(error);
            }
        )
        if (cityExists == false) {
            const newCityRef = push(citiesListRef);
            set(newCityRef, {
                cityToAdd,
            });
            let response = await requestCity(cityToAdd)
            let newCities = [...cities, [response, newCityRef.key]];
            setCities(newCities)
        }
        else {
            console.log(cityToAdd + " already exists")
        }
    }

    const setUp = async function () {
        const citiesListRef = ref(database, "cities/" + useAuth.user.uid);
        let newCities = [];
        get(citiesListRef).then(
            (snapshot) => {
                const process = async (data) => {
                    for (const id_tag in data) {
                        for (const city in data[id_tag]) {
                            console.log(data[id_tag][city]);
                            newCities.push([data[id_tag][city], id_tag]);
                        }
                    }
                    const citiesPromises = newCities.map(async ([city, tag]) => {
                        const cityResponse = await requestCity(city);
                        return [cityResponse, tag];
                    });
                    const citiesFormatted = await Promise.allSettled(citiesPromises)
                    for (let i = 0; i < citiesFormatted.length; i++) {
                        if (citiesFormatted[i].status == "fulfilled") {
                            citiesFormatted[i] = [citiesFormatted[i].value[0], citiesFormatted[i].value[1]]
                        }
                        else {
                            citiesFormatted[i] = ["error", citiesFormatted[i].value[1]]
                        }
                    }
                    console.log("citiesFormatted", citiesFormatted);
                    setCities(citiesFormatted);
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
        let jsonResponse;
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

    const handleDeletion = async function (idToDelete) {
        const refToBeDeleted = ref(database, "cities/" + useAuth.user.uid + "/" + idToDelete);
        try {
            remove(refToBeDeleted)
            for (let i = 0; i < cities.length; i++) {
                if (cities[i][1] == idToDelete) {
                    const newCities = cities.filter(([_, id]) => id != idToDelete);
                    setCities(newCities)
                    break
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmission}>
                <label>
                    <p>Add city to monitor: </p>
                    <input
                        onChange={(e) => setCity(e.target.value)}
                        value={city == null ? "" : city}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div>
                {
                    cities.map((city) => {
                        return (
                            <div key={city[1]}>
                                {city[0].name + " " + city[1]}
                                <button type="submit" onClick={() => handleDeletion(city[1])}> Delete </button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}
