import * as actionTypes from '../action/userAuth_action'

const userInitAuth = {
  name: '',
  email: '',
  password: '',
  newPassword: '',
  newName: ''
}

export const userAuth = (state = userInitAuth, action) => {
  switch(action.type) {

    case actionTypes.SET_NAME_INPUT:
      return {...state, name: action.name}

    case actionTypes.SET_EMAIL_INPUT:
      return {...state, email: action.email}

    case actionTypes.SET_PASSWORD_INPUT:
      return {...state, password: action.password}

    case actionTypes.SET_NEW_PASSWORD_INPUT:
      return {...state, newPassword: action.password}

    case actionTypes.SET_NEW_NAME_INPUT:
      return {...state, newName: action.name}

    case actionTypes.CLEAR_AUTH_INPUT:
      return {
        ...userInitAuth
      }

    default:
      return state
  }
}

const userInitData = {
  id: '',
  name: '',
  email: '',
  post: '',
  joined: '',
  isRegister: null,
  isLogin: false,
}

export const userData = (state = userInitData, action) => {
  switch(action.type) {
  case actionTypes.SET_IS_LOGIN:
    return {
      ...state,
      id: action.id,
      name: action.name,
      email: action.email,
      password: action.password,
      joined: action.joined,
      isLogin: true
    }
  
  case actionTypes.SET_IS_REGISTER:
    return {
      ...state,
      isRegister: true
    }

  //used for after changed name
  case actionTypes.SET_USER_NAME:
    return {
      ...state,
      name: action.name
    }

  case actionTypes.SET_LOGOUT:
    return {
      ...userInitData
    }

  default:
    return state;
  }
}