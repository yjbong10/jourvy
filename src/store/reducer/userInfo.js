import * as actionTypes from '../action/userInfo_action'

const localStore = window.localStorage
const autoState = (localStore.getItem('auto_location')) 
                    ? JSON.parse(localStore.getItem('auto_location')) 
                    : true

const userInfoInit = {
  total_posts: '',
  total_edits: '',
  total_deletes: '',
  location: {
    auto: autoState,
    method: {
      byCity: true,
      byGeo: false,
    },
    lat: Number(localStore.getItem('lat')) || '',
    lon: Number(localStore.getItem('lon')) || '',
    city: localStore.getItem('city') || ''
  }
}

export const userInfo = (state = userInfoInit, action) => {
  switch(action.type) {
    case actionTypes.SET_GEOLOCATION:
        localStorage.removeItem("city");
        const lat = Number(action.lat)
        const lon = Number(action.lon)

        if (action.lat && action.lon && !state.location.auto) {
          localStore.setItem('lat', lat)
          localStore.setItem('lon', lon)
        }

        return {
            ...state,
            location: {
              ...state.location,
              lat: lat,
              lon: lon,
              city: ''
            }
        }

    case actionTypes.SET_CITY: 
        localStorage.removeItem("lat");
        localStorage.removeItem("lon");
        if (action.city && !state.location.auto) {
          localStore.setItem('city', action.city)
        }

        return {
          ...state,
          location: {
            ...state.location,
            lat: '',
            lon: '',
            city: action.city
          }
        }

    case actionTypes.SET_TOTAL:
        return {
          ...state,
          total_posts: action.total_posts,
          total_edits: action.total_edits,
          total_deletes: action.total_deletes
        }

    case actionTypes.SET_IS_AUTO_LOCATION:
      let newAuto = !state.location.auto
        if(action.status !== undefined) {
          newAuto = action.status
        }

      localStore.setItem('auto_location', JSON.stringify(newAuto))

      return {
        ...state,
        location: {
          ...state.location,
          auto: newAuto,
        }
      }

    case actionTypes.TOGGLE_LOCATION_METHOD:
      const newByCity = !state.location.method.byCity
      const newByGeo = !state.location.method.byGeo
      return {
        ...state,
        location: {
          ...state.location,
          method: {
            byCity: newByCity,
            byGeo: newByGeo,
          }
        }
      }

    case actionTypes.CLEAR_USER_INFO:
        localStore.clear();
        return userInfoInit

    default:
        return state
  }
}

const userInfoInputInit = {
  lat: '',
  lon: '',
  city: ''
}

export const userInfoInput = (state = userInfoInputInit, action) => {
  switch(action.type) {
    case actionTypes.SET_CITY_INPUT:
        return {
          ...state,
          city: action.input,
          lat: '',
          lon: '',
        }

    case actionTypes.SET_GEOLOCATION_INPUT:
        return {
          ...state,
          lat: action.lat,
          lon: action.lon,
          city: ''
        }
      

    case actionTypes.CLEAR_USER_INFO_INPUT:
        return userInfoInputInit

    default:
        return state
  }
}