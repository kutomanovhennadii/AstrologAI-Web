// useCountryAndCity.js
import { useState } from 'react';
import { getCountries, getCitiesByCountry } from '../../utils/countryCityUtils';

export const useCountryAndCity = (refs) => {
    //console.log("useCountryAndCity refs", refs);

    const countries = getCountries();
    const [lists, setLists] = useState({
        countryList: countries.map(country => ({ label: country, value: country })),
        cityList: []
    });

    const onSelectCountry = (country) => {
        //console.log("onSelectCountry refs", refs);

        if (refs.birth_city.current) {
            refs.birth_city.current.removeValue();
        }
        const newCityList = getCitiesByCountry(country).map(city => ({ label: city, value: city }));
        setLists(prevState => ({
            ...prevState,
            cityList: newCityList
        }));

    };

    const onSelectCity = (city) => {

    };

    return [lists.countryList, lists.cityList, onSelectCountry, onSelectCity];
};