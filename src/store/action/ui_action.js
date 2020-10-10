
export const SET_PROGRESS = 'SET_PROGRESS';
export const setProgress = (num, method) => {
    return {
        type: SET_PROGRESS,
        progress: num,
        method: method
    }
}

export const SET_IS_SHOW = 'SET_IS_SHOW';
export const setIsShow = (status) => {
    return {
        type: SET_IS_SHOW,
        status: status
    }
}

export const SET_ERROR = 'SET_ERROR';
export const setError = (error, status) => {
    return {
        type: SET_ERROR,
        error: error,
        status: status || null
    }
}

export const SET_IS_LOAD = 'SET_IS_LOAD';
export const setIsLoad = (status) => {
    return {
        type: SET_IS_LOAD,
        status: status
    }
}

export const SET_IS_WEATHER_LOAD = 'SET_IS_WEATHER_LOAD';
export const setIsWeatherLoad = (status) => {
    return {
        type: SET_IS_WEATHER_LOAD,
        status: status
    }
}

//v// this is for toggling sidebar 
export const TOGGLER_IS_SIDEBAR_SHOW = 'TOGGLER_IS_SIDEBAR_SHOW';
export const togglerIsSidebarShow = () => {
    return {
        type: TOGGLER_IS_SIDEBAR_SHOW,
    }
}

//v// this is hard setting if sidebar show 
export const SET_IS_SIDEBAR_SHOW = 'SET_IS_SIDEBAR_SHOW';
export const setIsSidebarShow = (status) => {
    return {
        type: SET_IS_SIDEBAR_SHOW,
        status: status
    }
}

export const SET_PROMPT = 'SET_PROMPT';
export const setPrompt = (status, message, name, needVerify) => {
    return {
        type: SET_PROMPT,
        status: status,
        message: message || '',
        name: name || '',
        needVerify: needVerify || false
    }
}

export const SET_PROMPT_IS_CONFIRM = 'SET_PROMPT_IS_CONFIRM';
export const setPromptIsConfirm = (status, name) => {
    return {
        type: SET_PROMPT_IS_CONFIRM,
        status: status,
        name: name,
        needVerify: false
    }
}


//v// profile route
export const SET_ON_EDIT_ACCOUNT = 'SET_ON_EDIT_ACCOUNT';
export const setOnEditAccount = (status) => {
    return {
        type: SET_ON_EDIT_ACCOUNT,
        status: status
    }
}

export const SET_ON_CHANGE_PASSWORD = 'SET_ON_CHANGE_PASSWORD';
export const setOnChangePassword = (status) => {
    return {
        type: SET_ON_CHANGE_PASSWORD,
        status: status
    }
}

export const SET_ON_CHANGE_NAME = 'SET_ON_CHANGE_NAME';
export const setOnChangeName = (status) => {
    return {
        type: SET_ON_CHANGE_NAME,
        status: status
    }
}

export const SET_ON_SETTING = 'SET_ON_SETTING';
export const setOnSetting = (status) => {
    return {
        type: SET_ON_SETTING,
        status: status
    }
}
//^// profile route



//not used yet
export const SET_IS_OVERLAY_SHOW = 'SET_IS_OVERLAY_SHOW';
export const setIsOverlayShow = (status) => {
    return {
        type: SET_IS_OVERLAY_SHOW,
        status: status,
    }
}


export const TOOGLE_IS_NIGHT_MODE = 'TOOGLE_IS_NIGHT_MODE';
export const toggleIsNightMode = () => {
    return {
        type: TOOGLE_IS_NIGHT_MODE
    }
}

export const SET_IS_NIGHT_MODE = 'SET_IS_NIGHT_MODE';
export const setIsNightMode = (status) => {
    return {
        type: SET_IS_NIGHT_MODE,
        status:status
    }
}

export const CLEAR_IS_NIGHT_MODE = 'CLEAR_IS_NIGHT_MODE';
export const clearIsNightMode = () => {
    return {
        type: CLEAR_IS_NIGHT_MODE
    }
}

//validate style
export const SET_IS_INPUT_VALID = 'SET_IS_INPUT_VALID';
export const setIsInputValid = (status) => {
    return {
        type: SET_IS_INPUT_VALID,
        status: status
    }
}