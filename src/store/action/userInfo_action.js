export const SET_GEOLOCATION = 'SET_GEOLOCATION';
export const setGeolocation = (lat, lon) => {
    return {
        type: SET_GEOLOCATION,
        lat: lat,
        lon: lon
    }
}

export const SET_CITY = 'SET_CITY';
export const setCity = (city) => {
    return {
        type: SET_CITY,
        city: city
    }
}

export const SET_TOTAL = 'SET_TOTAL';
export const setTotal = (posts, edits, deletes) => {
    return {
        type: SET_TOTAL,
        total_posts: posts,
        total_edits: edits,
        total_deletes: deletes
    }
}

export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';
export const clearUserInfo = () => {
    return {
        type: CLEAR_USER_INFO
    }
}

export const SET_IS_AUTO_LOCATION = 'SET_IS_AUTO_LOCATION';
export const setIsAutoLocation = (status) => {
    return {
        type: SET_IS_AUTO_LOCATION,
        status: status
    }
}

export const TOGGLE_LOCATION_METHOD = 'TOGGLE_LOCATION_METHOD';
export const toggleLocationMethod = () => {
    return {
        type: TOGGLE_LOCATION_METHOD
    }
}

export const SET_CITY_INPUT = 'SET_CITY_INPUT';
export const setCityInput = (input) => {
    return {
        type: SET_CITY_INPUT,
        input: input
    }
}

export const SET_GEOLOCATION_INPUT = 'SET_GEOLOCATION_INPUT';
export const setGeolocationInput = (lat, lon) => {
    return {
        type: SET_GEOLOCATION_INPUT,
        lat: lat,
        lon: lon
    }
}

export const CLEAR_USER_INFO_INPUT = 'CLEAR_USER_INFO_INPUT';
export const clearUserInfoInput = () => {
    return {
        type: CLEAR_USER_INFO_INPUT,
    }
}