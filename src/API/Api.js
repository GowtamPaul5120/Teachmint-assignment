import axios from 'axios';

const getUsers = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getPosts = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTime = async (selectedLocation) => {
    try {
        const response = await axios.get(`https://worldtimeapi.org/api/timezone/${selectedLocation}`);
        const datetimeString = response.data.datetime;

        if (datetimeString) {
            const timePart = datetimeString.split("T")[1].substring(0, 8);
            return timePart;
        }

    } catch (error) {
        throw error;
    }
};

const getCountryList = async () => {
    try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone');
        const continentList = ["Africa", "America", "Antarctica", "Asia", "Atlantic", "Australia", "Europe", "Indian", "Pacific", "Pacific"];
        const arrayOfObjects = response.data.map(item => {
            const [continent, country, state] = item.split('/');
            return {
                continent: continent || '',
                country: country || '',
                state: state || ''
            };
        });
        const newCountryList = arrayOfObjects.filter(obj => continentList.includes(obj.continent));
        return newCountryList;
    } catch (error) {
        throw error;
    }
};

export { getUsers, getPosts, getTime, getCountryList };
