import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Auth from './Auth/Auth';
import Home from '../Component/Home/Home';
import { setIsLogIn } from '../store/action/userAuth_action';
import { setProgress } from '../store/action/ui_action';
import { setIsShow, setError } from '../store/action/ui_action';
import LoadingBar from 'react-top-loading-bar';

const App = (props) => {

  useEffect(() => {
    props.setProgress(10)
    fetch('https://jourvy-server.herokuapp.com/', {credentials: 'include'})
      .then(res => res.json())
      .then(data => {
        const {id, name, email, joined} = data;
        if (data.id) {
            props.setIsLogin(id, name, email, joined)
        } else {
            props.setIsShow(true)
            props.setError(data)
        }
      props.setProgress(100)
      })
      .catch(err => {
        props.setIsShow(true)
        props.setError('something is wrong. :(')
        props.setProgress(100)
      })
    props.setProgress(50)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
        <LoadingBar
            color='#db7e7e'
            height={3}
            progress={props.progress}
            loaderSpeed={400}
            waitingTime={200}
            onLoaderFinished={() => props.setProgress(0)}
        />
      {(props.isLogin)
        ? <Home {...props} />
        : <Auth {...props} />
      }
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.userData.isLogin,
    progress: state.progress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setIsLogin: (id, name, email, joined) => dispatch(setIsLogIn(id, name, email, joined)),
      setProgress: (num) => dispatch(setProgress(num))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
