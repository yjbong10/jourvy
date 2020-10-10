import * as actionTypes from '../action/ui_action'

const progressInit = 0
export const progress = (state = progressInit, action) => {
    switch(action.type) {
        case actionTypes.SET_PROGRESS:
            if (action.method) {
                return state + action.progress
            } else {
                return action.progress
            }
        default:
            return state    
    }
}

const isShowInit = false;
export const isShow = (state = isShowInit, action) => {
    switch(action.type) {
        case actionTypes.SET_IS_SHOW:
            return action.status;

        default:
            return state
    }
} 

const errorInit = {
    message: '',
    status: ''
};
export const error = (state = errorInit, action) => {
    switch(action.type) {
        case actionTypes.SET_ERROR:
            return {
                ...state,
                message: action.error,
                status: null || action.status
            }

        default:
            return state
    }
}

const isLoadInit = true;
export const isLoad = (state = isLoadInit, action) => {
    switch(action.type) {
        case actionTypes.SET_IS_LOAD:
            return action.status

        default:
            return state
    }
}

const isWeatherLoadInit = true;
export const isWeatherLoad = (state = isWeatherLoadInit, action) => {
    switch(action.type) {
        case actionTypes.SET_IS_WEATHER_LOAD:
            return action.status

        default:
            return state
    }
}

const isSideBarShowInit = false;
export const isSideBarShow = (state = isSideBarShowInit, action) => {
    switch(action.type) {
        case actionTypes.TOGGLER_IS_SIDEBAR_SHOW:
            const newSideBarState = state
            return !newSideBarState

        case actionTypes.SET_IS_SIDEBAR_SHOW:
            return action.status

        default:
            return state
    }
} 

const promptInit = {
    isPromptShow: true,
    message: '',
    name: '',
    isConfirm: false,
    needVerify: false
};
export const prompt = (state = promptInit, action) => {
    switch(action.type) {
        case actionTypes.SET_PROMPT:
            return {
                ...state,
                isPromptShow: action.status,
                message: action.message,
                name: action.name || state.name,
                needVerify: action.needVerify
            }

        case actionTypes.SET_PROMPT_IS_CONFIRM:
            const newName = (action.name === 'clear') ? '' : state.name
            return {
                ...state,
                isConfirm: action.status,
                name: newName,
                needVerify: false
            }

        default:
            return state
    }
} 

//not used yet
const isOverlayShowInit = false;
export const isOverlayShow = (state = isOverlayShowInit, action) => {
    switch(action.type) {
        case actionTypes.SET_IS_OVERLAY_SHOW:
            return action.status;

        default:
            return state
    }
} 

const profileRouteInit = {
    onEditAccount: false,
    onChangePassword: false,
    onChangeName: false,
    onSetting: false
};
export const profileRoutes = (state = profileRouteInit, action) => {
    switch(action.type) {
        case actionTypes.SET_ON_EDIT_ACCOUNT:
            return {
                ...state,
                onEditAccount: action.status,
                onChangePassword: false,
                onChangeName: false,
                onSetting: false
            }

        case actionTypes.SET_ON_CHANGE_PASSWORD:
            return {
                ...state,
                onChangePassword: action.status,
                onChangeName: false
            }

        case actionTypes.SET_ON_CHANGE_NAME:
            return {
                ...state,
                onChangeName: action.status,
                onChangePassword: false
            }

        case actionTypes.SET_ON_SETTING:
            return {
                ...state,
                onSetting: action.status,
                onEditAccount: false,
                onChangePassword: false,
                onChangeName: false,
            }

        default:
            return state
    }
} 

const localStore = window.localStorage

const isNightModeInit =  JSON.parse(localStore.getItem('isNightMode')) || false

if (isNightModeInit) {
    document.documentElement.setAttribute('data-theme', 'dark')
} else {
    document.documentElement.setAttribute('data-theme', 'light')
}

export const isNightMode = (state = isNightModeInit, action) => {
    switch(action.type) {
        case actionTypes.TOOGLE_IS_NIGHT_MODE:
            const newisNightMode = !state
            localStore.setItem('isNightMode', newisNightMode)

            if (newisNightMode) {
                document.documentElement.setAttribute('data-theme', 'dark')
            } else {
                document.documentElement.setAttribute('data-theme', 'light')
            }

            return newisNightMode
        
            
        case actionTypes.SET_IS_NIGHT_MODE:
            localStore.setItem('isNightMode', action.status)
            return action.status


        case actionTypes.CLEAR_IS_NIGHT_MODE:
            localStore.clear();
            return isNightModeInit

        default:
            return state    
    }
}

//validate style
const isInputValidInit = null;
export const isInputValid = (state = isInputValidInit, action) => {
  switch(action.type) {
    case actionTypes.SET_IS_INPUT_VALID:
      return action.status
    
    default:
      return state
  }
}