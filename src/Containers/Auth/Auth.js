import React, { useEffect } from 'react';
import css from './Auth.module.css';
import LogIn from '../../Component/AuthFromCombs/LogIn/LogIn';
import Register from '../../Component/AuthFromCombs/Register/Register';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLogIn, setIsRegister, setNameInput, setEmailInput, setPasswordInput, clearAuthInput } from '../../store/action/userAuth_action';
import { setProgress, setIsShow, setError, setIsNightMode } from '../../store/action/ui_action';
import { setIsAutoLocation, setGeolocation, setCity } from '../../store/action/userInfo_action';

const Auth = (props) => {
    useEffect(() => {
        props.history.push('/login')
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude

            if (props.autoLocation) {
                props.setGeolocation(lat, lon)
            } 

          }, err => {
            props.setCity('Kuala Lumpur')

          }, {enableHighAccuracy: true});
        // eslint-disable-next-line
    },[])

    const onLogIn = (e, email, password) => {
        e.preventDefault();
        props.setProgress(10);
        fetch('https://jourvy-server.herokuapp.com/login', {
            method: 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                const {is_night_mode} = data;
                const {auto_location, location_method} = data;
                const {lat, lon, city} = data;

                if (data.id) { //proper respond from server should contain id if not mean err
                    props.setIsShow(false); //stop showing
                    props.clearAuthInput()
                    props.setIsNightMode(is_night_mode)
                    props.setIsAutoLocation(auto_location)

                    //if auto set to false then check what method used, false mean byCity
                    if (!auto_location) {
                        if(location_method) {
                            props.setGeolocation(lat, lon)
                        } else {
                            props.setCity(city)
                        }
                    }

                    return data

                } else {
                    return data
                }
            })
            .then(data => { //only log user in when all the data above is set
                const {id, name, email, joined} = data;
                if (data.id) {
                    props.setIsLogin(id, name, email, joined)
                } else {
                    props.setError(data); //show error msg from server
                    props.setIsShow(true);
                }   
                props.setProgress(100);
            })
            .catch(err => {
                props.setIsShow(true);
                props.setError('something is wrong :('); //show fetch error msg
                props.setProgress(100);
            })
        props.setProgress(30, 'add');
    }

    const onRegister = async (e, name, email, password) => {
        e.preventDefault();
        props.setProgress(10);
        fetch('https://jourvy-server.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.id) { //proper respond from server should contain id if not mean err
                    props.setIsShow(false); //stop showing
                    props.setIsRegister();
                    props.history.push('/login')
                } else {
                    props.setError(data); //show error msg from server
                    props.setIsShow(true);
                }
                props.setProgress(100);
            })
            .catch(err => {
                props.setError(err); //show fetch error msg
                props.setIsShow(true);
                props.setProgress(100);
            })
        props.setProgress(30, 'add');
    }

    return (
        <div className={css.wrapper}>
            <Switch>
                <Route path="/login" exact component={() => <LogIn submit={onLogIn} {...props}/>} />
                <Route path="/register" exact component={() => <Register submit={onRegister} {...props} />} />
            </Switch>
            <p className={css.footer}>&copy; Copyright 2020 Jourvy</p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        autoLocation: state.userInfo.location.auto,
        city: state.userInfo.location.city,
        lat: state.userInfo.location.lat,
        lon: state.userInfo.location.lon
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsLogin: (id, name, email, joined) => dispatch(setIsLogIn(id, name, email, joined)),
        setIsRegister: () => dispatch(setIsRegister()),
        setNameInput: (name) => dispatch(setNameInput(name)),
        setEmailInput: (email) => dispatch(setEmailInput(email)),
        setPasswordInput: (password) => dispatch(setPasswordInput(password)),
        clearAuthInput: () =>dispatch(clearAuthInput()),
        setProgress: (num) => dispatch(setProgress(num)),
        setError: (error, status) => dispatch(setError(error, status)),
        setIsShow: (status) => dispatch(setIsShow(status)),
        setIsAutoLocation: (status) => dispatch(setIsAutoLocation(status)),
        setGeolocation: (lon, lat) => dispatch(setGeolocation(lon, lat)),
        setCity: (city) => dispatch(setCity(city)),
        setIsNightMode: (status) => dispatch(setIsNightMode(status))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
