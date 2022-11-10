import React, { useState, useContext, useEffect } from "react";
import { weatherApiKey } from "../../env";
import { database } from "../utils/firebase-config";
import { ref, push, set, get, remove } from "firebase/database";
import { authContext } from "../utils/auth";
import { useMutation } from "react-query";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';
import { toast } from 'react-toastify';

const requestCity = async function (cityToRequest) {
    const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${cityToRequest}&appid=${weatherApiKey}&units=metric`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
    );
    if (!response.ok) {
        toast("Unexpected error when adding the city! Maybe the city doesn't exist in the database or there are spelling mistakes.")
        throw new Error("Response is not ok!")
    }
    return response.json();
};

export default function Cities() {
    const [cities, setCities] = useState([]);
    const useAuth = useContext(authContext);
    const [input, setInput] = useState('');
    const mutation = useMutation(({ cityToRequest }) => requestCity(cityToRequest))

    const getData = () => {
        let res = []
        for (let i = 0; i < cities.length; i++) {
            res.push(
                {
                    x: `${cities[i][0].name}, ${cities[i][0].coord.lat}`,
                    y: cities[i][0].main.temp
                }
            )
        }
        res = res.sort((a, b) => {
            let a_lat = a.x.split(",")
            const a_lat_float = parseFloat(a_lat[1])
            let b_lat = b.x.split(",")
            const b_lat_float = parseFloat(b_lat[1])
            if (a_lat_float > b_lat_float)
                return -1;
            if (a_lat_float < b_lat_float)
                return 1;
            return 0;
        })
        return res
    }

    const capitalize = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const handleSubmission = async function (e) {
        try {
            e.preventDefault();
            let cityToAdd = input.toLowerCase()
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
                                        if (data[id_tag][cityName].toLowerCase() === cityToAdd) {
                                            cityExists = true
                                            break
                                        }
                                    }
                                }
                            }
                            process(snapshot.val());
                        },
                        function (error) {
                            toast(error);
                        }
                    )

                    if (cityExists === false) {
                        const newCityRef = push(citiesListRef);
                        set(newCityRef, {
                            cityToAdd,
                        });
                        let newCities = [...cities, [data, newCityRef.key]];
                        setCities(newCities)
                    }
                    else {
                        toast(cityToAdd + " already exists!")
                    }
                },
                onError: (error) => {
                    toast(error)
                },
            })
        }
        catch (error) {
            toast(error)
        }
    }

    const setUp = async function () {
        try {
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
                        setCities(resultCities);
                    };
                    process(snapshot.val());
                },
                function (error) {
                    console.error(error);
                }
            );
        }
        catch (error) {
            toast(error)
        }
    };

    useEffect(() => {
        setUp();
    }, []);


    const handleDeletion = async function (idToDelete) {
        try {
            const refToBeDeleted = ref(database, "cities/" + useAuth.user.uid + "/" + idToDelete);
            remove(refToBeDeleted)
            for (let i = 0; i < cities.length; i++) {
                if (cities[i][1] === idToDelete) {
                    const newCities = cities.filter(([_, id]) => id != idToDelete);
                    setCities(newCities)
                    break
                }
            }
        }
        catch (error) {
            toast(error)
        }
    }

    return (
        <div style={{ display: "inline-block" }}>
            <form onSubmit={(e) => handleSubmission(e)}>
                <label>
                    <p>Add city to monitor: </p>
                    <input
                        id="city-add"
                        type="text" 
                        onChange={(e) => setInput(e.target.value)}
                        value={input === null ? "" : input}
                    />
                </label>
                <button tabIndex={0} type="submit" className="fourth">Submit</button>
            </form>
            <section style={{ "display": "grid", "gridTemplateColumns": "200px 200px 200px 200px 200px" }}>
                {
                    cities.map((city) => {
                        return (
                            <menu className="card">
                                <h3 style={{ margin: 0, padding: 0 }} >{city[0].name}</h3>
                                <h4 style={{ margin: "10px", padding: 0 }}>{capitalize(city[0].weather[0].description)}</h4>
                                <li>Feels like: {city[0].main.feels_like}°C</li>
                                <li>Temp max: {city[0].main.temp_max}°C</li>
                                <li>Temp min: {city[0].main.temp_min}°C</li>
                                <li>Humidity: {city[0].main.humidity}%</li>
                                <li>Wind speed: {city[0].wind.speed}m/s</li>
                                <li>Wind degree: {city[0].wind.deg}°</li>
                                <button tabIndex={0} style={{ marginTop: "10px" }} type="submit" onClick={() => handleDeletion(city[1])}> Delete </button>
                            </menu>
                        );
                    })
                }
            </section>
            {
                cities.length != 0 &&
                (
                    <figure className="flex-column">
                        <figcaption fill="black" textAnchor="middle" dominantBaseline="central" fontSize={14}>
                            Tempreatures accross latitude
                        </figcaption>
                        <LineChart alt={"Figure showing the temperatures accross latitude"} width={700} height={400} data={getData()}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <Line type="monotone" dataKey="y" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="x">
                                <Label value="Latitude" dy={+20} />
                            </XAxis>
                            <YAxis>
                                <Label value="Temp" dx={-20} />
                            </YAxis>
                            <Tooltip />
                        </LineChart>
                    </figure>
                )
            } 
        </div>
    );
}
