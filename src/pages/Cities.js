import React, { useState, useContext, useEffect } from "react";
import { weatherApiKey } from "../../env";
import { database } from "../firebase-config";
import { ref, push, set, get, remove } from "firebase/database";
import { authContext } from "../auth";
import { useMutation } from "react-query";

const requestCity = async function (cityToRequest) {
    const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${cityToRequest}&appid=${weatherApiKey}&units=metric`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
    );
    if (!response.ok) {
        throw new Error("Response is not ok!")
    }
    return response.json();
};

export default function Cities() {
    const [cities, setCities] = useState([]);
    const useAuth = useContext(authContext);
    const [input, setInput] = useState('');
    const mutation = useMutation(({ cityToRequest }) => requestCity(cityToRequest))

    const handleSubmission = async function (e) {
        e.preventDefault();
        let cityToAdd = input.toLowerCase()
        cityToAdd = cityToAdd.replace(/\s/g, '')
        setInput(null)

        mutation.mutate({ cityToRequest: cityToAdd }, {
            onSuccess: async (data) => {
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
                    let newCities = [...cities, [data, newCityRef.key]];
                    console.log(newCities)
                    setCities(newCities)
                }
                else {
                    console.log(cityToAdd + " already exists")
                }
            },
            onError: (error) => {
                console.log(error)
            },
        })
    }

    const setUp = async function () {
        const citiesListRef = ref(database, "cities/" + useAuth.user.uid);
        let newCities = [];
        get(citiesListRef).then(
            (snapshot) => {
                const process = async (data) => {
                    for (const id_tag in data) {
                        for (const city in data[id_tag]) {
                            newCities.push([data[id_tag][city], id_tag]);
                        }
                    }
                    let cityPromises = newCities.map(async ([city, tag]) => {
                        const cityResponse = mutation.mutateAsync({ cityToRequest: city })
                        return ([cityResponse, tag]);
                    });
                    cityPromises = await Promise.allSettled(cityPromises)
                    cityPromises = cityPromises.map(cityPromise => { return cityPromise.value; });
                    const cityTags = cityPromises.map(([city, tag]) => { return tag; });
                    cityPromises = cityPromises.map(([city, tag]) => { return city; });
                    cityPromises = await Promise.allSettled(cityPromises)
                    cityPromises = cityPromises.map(cityPromise => { return cityPromise.value; });
                    let resultCities = []
                    for (let i = 0; i < cityPromises.length; i++) {
                        resultCities.push([cityPromises[i], cityTags[i]])
                    }
                    console.log("resultCities", resultCities);
                    setCities(resultCities);
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
            <form onSubmit={(e) => handleSubmission(e)}>
                <label>
                    <p>Add city to monitor: </p>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input == null ? "" : input}
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
