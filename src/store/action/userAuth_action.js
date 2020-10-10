export const SET_IS_LOGIN = 'SET_IS_LOGIN';
export const setIsLogIn = (id, name, email, joined) => {
    return {
        type: SET_IS_LOGIN,
        id,
        name,
        email,
        joined
    }
}

export const SET_LOGOUT = 'SET_LOGOUT';
export const setLogOut = () => {
    return {
        type: SET_LOGOUT
    }
}

export const SET_IS_REGISTER = 'SET_IS_REGISTER';
export const setIsRegister = () => {
    return {
        type: SET_IS_REGISTER,
    }
}

export const SET_NAME_INPUT = 'SET_NAME_INPUT';
export const setNameInput = (name) => {
    return {
        type: SET_NAME_INPUT,
        name: name
    }
}

export const SET_EMAIL_INPUT = 'SET_EMAIL_INPUT';
export const setEmailInput = (email) => {
    return {
        type: SET_EMAIL_INPUT,
        email: email
    }
}

export const SET_PASSWORD_INPUT = 'SET_PASSWORD_INPUT';
export const setPasswordInput = (password) => {
    return {
        type: SET_PASSWORD_INPUT,
        password: password
    }
}

export const SET_NEW_PASSWORD_INPUT = 'SET_NEW_PASSWORD_INPUT';
export const setNewPasswordInput = (password) => {
    return {
        type: SET_NEW_PASSWORD_INPUT,
        password: password
    }
}

export const SET_NEW_NAME_INPUT = 'SET_NEW_NAME_INPUT';
export const setNewNameInput = (name) => {
    return {
        type: SET_NEW_NAME_INPUT,
        name: name
    }
}

//used for after changed name
export const SET_USER_NAME = 'SET_USER_NAME';
export const setUserName = (name) => {
    return {
        type: SET_USER_NAME,
        name: name
    }
}

export const CLEAR_AUTH_INPUT = 'CLEAR_AUTH_INPUT';
export const clearAuthInput = () => {
    return {
        type: CLEAR_AUTH_INPUT
    }
}