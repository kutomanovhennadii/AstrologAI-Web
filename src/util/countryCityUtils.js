// countryCityUtils.js
import countries_and_cities from '../static/json/countries_and_cities.json';

export const getCountries = () => {
    console.log("getCountries");
    return Object.keys(countries_and_cities);
};

export const getCitiesByCountry = (country) => {
    
    const cities = countries_and_cities[country] || [];
    console.log("getCitiesByCountry ", cities);
    return cities.sort();
};