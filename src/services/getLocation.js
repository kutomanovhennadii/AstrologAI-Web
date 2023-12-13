import * as Location from 'expo-location';

const getLocation = async () => {
    console.log("getLocation start");
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("getLocation status", status);
    if (status !== 'granted') {
        console.error('Доступ к геолокации не предоставлен');
        return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("getLocation location", location);

    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    };
};

export default getLocation;
