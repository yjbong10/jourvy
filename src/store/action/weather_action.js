export const SET_WEATHER_INFO = 'SET_WEATHER_INFO';
export const setWeatherInfo = (id, main, temp, feels_like, temp_min, temp_max, description, country, city) => {
    return {
        type: SET_WEATHER_INFO,
        id: id,
        main: main,
        temp: temp,
        feels_like: feels_like,
        temp_min: temp_min,
        temp_max: temp_max,
        description: description,
        country: country,
        city: city
    }
}

export const CLEAR_WEATHER_INFO = 'CLEAR_WEATHER_INFO';
export const clearWeatherInfo = () => {
    return {
        type: CLEAR_WEATHER_INFO
    }
}