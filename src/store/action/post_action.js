//list
export const SET_USER_POSTS = 'SET_USER_POSTS';
export const setUserPosts = (posts) => {
    return {
        type: SET_USER_POSTS,
        posts: posts
    }
}

export const CLEAR_USER_POSTS = 'CLEAR_USER_POSTS';
export const clearUserPosts = () => {
    return {
        type: CLEAR_USER_POSTS
    }
}

export const SORT_USER_POSTS = 'SORT_USER_POSTS';
export const sortUserPosts = (method) => {
    return {
        type: SORT_USER_POSTS,
        method: method
    }
}

export const SET_SEARCH_INPUT = 'SET_SEARCH_INPUT';
export const setSearchInput = (input) => {
    return {
        type: SET_SEARCH_INPUT,
        input: input
    }
}

export const CLEAR_SEARCH_INPUT = 'CLEAR_SEARCH_INPUT';
export const clearSearchInput = () => {
    return {
        type: CLEAR_SEARCH_INPUT,
    }
}
//



//read
export const SET_CURRENT_POST = 'SET_CURRENT_POST';
export const setCurrentPost = (id) => {
    return {
        type: SET_CURRENT_POST,
        payload: id
    }
}

export const CLEAR_CURRENT_POST = 'CLEAR_CURRENT_POST';
export const clearCurrentPost = () => {
    return {
        type: CLEAR_CURRENT_POST
    }
}
//




//compose
export const SET_TITLE_INPUT = 'SET_TITLE_INPUT';
export const setTitleInput = (title) => {
    return {
        type: SET_TITLE_INPUT,
        title: title
    }
}

export const SET_CONTENT_INPUT = 'SET_CONTENT_INPUT';
export const setContentInput = (content) => {
    return {
        type: SET_CONTENT_INPUT,
        content: content
    }
}

export const CLEAR_POST_INPUT = 'CLEAR_POST_INPUT';
export const clearPostInput = () => {
    return {
        type: CLEAR_POST_INPUT,
    }
}

export const SET_RELOAD_POST = 'SET_RELOAD_POST';
export const setReloadPost = () => {
    return {
        type: SET_RELOAD_POST,
    }
}
//



//edit
export const EDIT_TITLE_INPUT = 'EDIT_TITLE_INPUT';
export const editTitleInput = (title) => {
    return {
        type: EDIT_TITLE_INPUT,
        title: title
    }
}

export const EDIT_CONTENT_INPUT = 'EDIT_CONTENT_INPUT';
export const editContentInput = (content) => {
    return {
        type: EDIT_CONTENT_INPUT,
        content: content
    }
}

export const CLEAR_EDIT_INPUT = 'CLEAR_EDIT_INPUT';
export const clearEditInput = () => {
    return {
        type: CLEAR_EDIT_INPUT
    }
}