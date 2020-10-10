import React, { useEffect } from 'react';
import css from './PgProfile.module.css';
import PgProfileCombine from './PgProfileCombine/PgProfileCombine';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as profileBtnFetch from './profileBtnFetch/profileBtnFetch';
import { setTotal } from '../../../../store/action/userInfo_action';
import { setIsShow, setError, setPrompt, setPromptIsConfirm, setProgress, toggleIsNightMode } from '../../../../store/action/ui_action';
import { setOnEditAccount, setOnChangePassword, setOnChangeName, setOnSetting } from '../../../../store/action/ui_action';
import { setPasswordInput, setNewPasswordInput } from '../../../../store/action/userAuth_action';
import { setNewNameInput, setUserName } from '../../../../store/action/userAuth_action';
import { toggleLocationMethod, setIsAutoLocation } from '../../../../store/action/userInfo_action';
import { setCityInput, setGeolocationInput, clearUserInfoInput } from '../../../../store/action/userInfo_action';
import { setGeolocation, setCity } from '../../../../store/action/userInfo_action';
import { setWeatherInfo } from '../../../../store/action/weather_action';
import { setIsInputValid } from '../../../../store/action/ui_action'

const PgProfile = (props) => {

  //set to profile main route whenever this page get dismount 
  useEffect(() => {
    return() => {
      props.setOnEditAccount(false)
      props.setOnSetting(false)
    }
    // eslint-disable-next-line
  }, [])

  //set to auto location if location not found.
  const { lat, lon, city } = props.userInfoInput
  const { setIsAutoLocation } = props
  const { onSetting } = props.profileRoutes 
  useEffect(() => {
    return () => {

      if ( !onSetting && !lat && !lon && !city ) {
        setIsAutoLocation(true)
    }

    }
  }, [lat, lon, city, onSetting, setIsAutoLocation])


  //this is to get profile stats
  useEffect(() => {
    fetch('https://jourvy-server.herokuapp.com/profile', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: props.userData.email
      })
    }).then(res => res.json())
      .then(data => {
        if(data.email){
          const {total_posts, total_edits, total_deletes} = data
          props.setTotal(total_posts, total_edits, total_deletes)
        } else {
          console.log(data)
        }
      })
      .catch(err => {
        console.log(err)
      })

      // eslint-disable-next-line
  }, [])


  //this set default location if auto location set to true
  const { auto } = props.userInfo.location
  const { setGeolocation, setCity } = props
  useEffect(() => {
    if (auto) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
          setGeolocation(lat, lon)

      }, err => {
        setCity('Kuala Lumpur')

      }, {enableHighAccuracy: true});
    }
  }, [auto, setGeolocation, setCity])




  //V//this is the functions for btn in account
  //v//this is for btn fetching after prompt
  useEffect(() => {
    if (props.isPromptConfirm && props.promptName === 'RESET_PROFILE'){
      props.setPromptIsConfirm(false, 'clear')
      profileBtnFetch.onResetProfile(props)

    } else if (props.isPromptConfirm && props.promptName === 'CHANGE_PASSWORD') {
      props.setPromptIsConfirm(false, 'clear')
      profileBtnFetch.onChangePassword(props)

    } else if (props.isPromptConfirm && props.promptName === 'DELETE_ACCOUNT') {
      props.setPromptIsConfirm(false, 'clear')
      profileBtnFetch.onDeleteAccount(props)
    }

    // eslint-disable-next-line 
  }, [props.isPromptConfirm, props.promptName])
  //^//this is for btn fetching after prompt


  function onChangeName() {
    profileBtnFetch.onChangeName(props)
  }

  function onSetIsAutoLocation() {
    props.setIsAutoLocation()
    props.clearUserInfoInput()
  }

  //input validation
  function cityRegexAndSubmit(input) {
    const cityRegex = /^[a-zA-Z\s]{0,}$/

    if (input) {
      if (!cityRegex.test(input)) {
        props.setIsShow(false)
        setTimeout(() => {
          props.setIsShow(true)
          props.setError('invalid city name', 'warn')
        })
  
      } else {
        profileBtnFetch.locationVerify(props)
      }
    }
  }

  function latRegex(lat) {
    const latRegex = /^[-]?[0-9]{1,2}([.][0-9]{1,6})?$/
    if (lat) {
      if (!latRegex.test(lat)) {
        props.setIsShow(false)
        setTimeout(() => {
          props.setIsShow(true)
          props.setError('invalid latitude', 'warn')
        })
  
      } else if (props.userInfoInput.lon) {
        profileBtnFetch.locationVerify(props)
      }
    }
  }

  function lonRegexAndSubmit(lon) {
    const lonRegex = /^[-]?[0-9]{1,3}([.][0-9]{1,6})?$/
    if (lon) {
      if (!lonRegex.test(lon)) {
        props.setIsShow(false)
        setTimeout(() => {
          props.setIsShow(true)
          props.setError('invalid longitude', 'warn')
        }, 1)
  
      } else if (!props.userInfoInput.lat) {
        props.setIsShow(false)
        setTimeout(() => {
          props.setIsShow(true)
          props.setError('please enter latitude value', 'warn')
        }, 1)
  
      } else {
        profileBtnFetch.locationVerify(props)
      }
    }
  }

  function saveDefault() {

    profileBtnFetch.saveDefault(props)

  }

 //^//this is the functions for btn in account





  ////this is to map items to render on profile and account
  const joinedDate = new Date(props.userData.joined)
  const accItems = [{
    top: props.userData.name || props.userData.email,
    bottom: 'Name'
  }, {
    top: props.userData.email,
    bottom: 'Email'
  }, {
    top: joinedDate.toLocaleDateString(),
    bottom: 'Date Joined'
  }]
  
  const proItems = [{
    top: props.userInfo.total_posts || '--',
    bottom: 'Total Posts'
  }, {
    top: props.userInfo.total_edits || '--',
    bottom: 'Total Edits'
  }, {
    top: props.userInfo.total_deletes || '--',
    bottom: 'Total Deletes'
  }]

  return (
    <div className={css.container}>
      <PgProfileCombine 
        accItems={accItems} 
        proItems={proItems} 
        onChangeName={onChangeName}
        onSetAuto={onSetIsAutoLocation}
        cityRegexAndSubmit={cityRegexAndSubmit}
        latRegex={latRegex}
        lonRegexAndSubmit={lonRegexAndSubmit}
        saveDefault={saveDefault}
        {...props}
        />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userAuth: state.userAuth,
    userInfo: state.userInfo,
    isPromptConfirm: state.prompt.isConfirm,
    promptName:state.prompt.name,
    email: state.userData.email,
    userPasswordInput: state.userAuth.password,
    userNewPasswordInput: state.userAuth.newPassword,
    userNewNameInput: state.userAuth.newName,
    profileRoutes: state.profileRoutes,
    isNightMode: state.isNightMode,
    userInfoInput: state.userInfoInput,
    weatherInfo: state.weatherInfo,
    error: state.error,
    isInputValid: state.isInputValid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTotal: (posts, edits, deletes) => dispatch(setTotal(posts, edits, deletes)),
    setPrompt: (status, message, name, needVerify) => dispatch(setPrompt(status, message, name, needVerify)),
    setPromptIsConfirm: (status, name) => dispatch(setPromptIsConfirm(status, name)),

    setIsShow: (status) => dispatch(setIsShow(status)),
    setError: (error, status) => dispatch(setError(error, status)),
    setProgress: (num) => dispatch(setProgress(num)),
    toggleIsNightMode: () => dispatch(toggleIsNightMode()),

    setOnEditAccount: (status) => dispatch(setOnEditAccount(status)),
    setOnChangePassword: (status) => dispatch(setOnChangePassword(status)),
    setOnChangeName: (status) => dispatch(setOnChangeName(status)),
    setOnSetting: (status) => dispatch(setOnSetting(status)),

    setPasswordInput: (password) => dispatch(setPasswordInput(password)),
    setNewPasswordInput: (password) => dispatch(setNewPasswordInput(password)),
    setNewNameInput: (password) => dispatch(setNewNameInput(password)),
    setUserName: (name) => dispatch(setUserName(name)),
    setIsAutoLocation: (status) => dispatch(setIsAutoLocation(status)),
    toggleLocationMethod: () => dispatch(toggleLocationMethod()),

    setCityInput: (input) => dispatch(setCityInput(input)),
    setGeolocationInput: (lat, lon) => dispatch(setGeolocationInput(lat, lon)),
    clearUserInfoInput: () => dispatch(clearUserInfoInput()),
    setGeolocation: (lat, lon) => dispatch(setGeolocation(lat, lon)),
    setCity: (city) => dispatch(setCity(city)),

    setWeatherInfo: (id, main, temp, feels_like, temp_min, temp_max, description, country, city) => 
      dispatch(setWeatherInfo(id, main, temp, feels_like, temp_min, temp_max, description, country, city)),

    setIsInputValid: (status) => dispatch(setIsInputValid(status))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PgProfile))
