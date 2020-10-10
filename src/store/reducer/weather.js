import * as actionTypes from '../action/weather_action'

const weatherInfoInit = {
    weather: {
        id: '',
        main: '',
        icon: '',
        temp: '',
        feels_like: '',
        temp_min: '',
        temp_max: '',
        description: ''
    },
    location: {
        country: '',
        city: ''
    }
}
  
  export const weatherInfo = (state = weatherInfoInit, action) => {
    switch(action.type) {
    case actionTypes.SET_WEATHER_INFO: 
        return {
            ...state,
            weather: {
                id: action.id,
                main: action.main,
                temp: action.temp,
                feels_like: action.feels_like,
                temp_min: action.temp_min,
                temp_max: action.temp_max,
                description: action.description
            },
            location: {
                country: action.country,
                city: action.city
            }
        }

    case actionTypes.CLEAR_WEATHER_INFO:
        return weatherInfoInit
        
    default:
      return state;
    }
  }