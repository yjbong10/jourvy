import React from 'react';
import ReactDOM from 'react-dom';
import * as RootCss from './index.module.css';
import App from './Containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import { userPosts, currentPost, composeInput, reloadPost, editInput, searchInput } from './store/reducer/post';
import { userAuth, userData } from './store/reducer/userAuth';
import { progress, isShow, error, isInputValid}  from './store/reducer/ui';
import { isOverlayShow, isSideBarShow, prompt } from './store/reducer/ui';
import { isLoad, isWeatherLoad, profileRoutes, isNightMode } from './store/reducer/ui';
import { weatherInfo } from './store/reducer/weather';
import { userInfo, userInfoInput } from './store/reducer/userInfo';

const reducer = combineReducers({
  userPosts, currentPost, composeInput, reloadPost, editInput, searchInput,
  userAuth, userData,
  progress, isShow, error, isInputValid,
  isOverlayShow, isSideBarShow, prompt, 
  isLoad, isWeatherLoad, profileRoutes, isNightMode,
  weatherInfo,
  userInfo, userInfoInput})

// const middleware = [logger]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    // applyMiddleware(...middleware)
  ));

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App className={RootCss}/>
      </Router>
    </Provider>
  </React.StrictMode>
)

ReactDOM.render( app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
