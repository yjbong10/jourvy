import * as actionTypes from '../action/post_action'

//list page
const userPostsInit = [];
export const userPosts = (state = userPostsInit, action) => {
    switch(action.type) {
        case actionTypes.SET_USER_POSTS:
          return action.posts

        case actionTypes.CLEAR_USER_POSTS:
          return userPostsInit

        case actionTypes.SORT_USER_POSTS:
          const sortState = [...state]
          return (action.method === 'asc')
                    ?  sortState.sort((a, b) => a.id - b.id)
                    :  sortState.sort((a, b) => b.id - a.id)

        default:
            return state    
    }
}

const searchInputInit = ""
export const searchInput = (state = searchInputInit, action) => {
  switch(action.type) {
    case actionTypes.SET_SEARCH_INPUT:
      return action.input

    case actionTypes.CLEAR_SEARCH_INPUT:
      return searchInputInit

    default:
      return state
  }
}

//read page
const localStore = window.localStorage

const initialStateCurrentPost = {
  currentPost: Number(localStore.getItem('currentPost')) || null
}

export const currentPost = (state = initialStateCurrentPost, action) => {
  switch(action.type) {

    case actionTypes.SET_CURRENT_POST:
      localStore.setItem('currentPost', action.payload);
      return {...state, currentPost: action.payload}

    case actionTypes.CLEAR_CURRENT_POST:
      localStore.clear();
      return {
        ...state,
        currentPost: null
      }

    default:
      return state
  }
}



//compose page
const composeInputInit = {
  title: '',
  content: ''
}
export const composeInput = (state = composeInputInit, action) => {
    switch(action.type) {
      case actionTypes.SET_TITLE_INPUT:
        return {
          ...state,
          title: action.title
        }

      case actionTypes.SET_CONTENT_INPUT:
        return {
          ...state,
          content: action.content
        }

      case actionTypes.CLEAR_POST_INPUT:
        return {
          composeInputInit
        }

      default:
        return state
    }
}


//value doest matter, this is for post useEffect dependency, whenever its changes, post fetch again.
const reloadPostInit = false 
export const reloadPost = (state = reloadPostInit, action) => {
  switch(action.type) {
    
    case actionTypes.SET_RELOAD_POST:
      let newState = !state
      return newState

    default:
      return state
  }
}



//edit page
const editInputInit = {
  title: '',
  content: ''
}
export const editInput = (state = editInputInit, action) => {
    switch(action.type) {
      case actionTypes.EDIT_TITLE_INPUT:
        return {
          ...state,
          title: action.title
        }

      case actionTypes.EDIT_CONTENT_INPUT:
        return {
          ...state,
          content: action.content
        }

      case actionTypes.CLEAR_EDIT_INPUT:
        return editInputInit

      default:
        return state
    }
}