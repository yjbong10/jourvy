import React from 'react'
import css from './OnRouteSetting.module.css'
import AuthBtn from '../../../../../../UI/AuthBtn/AuthBtn'
import PromptInput from '../../../../../../UI/PromptInput/PromptInput'
import Toggler from '../../../../../../UI/Toggler/Toggler'

const OnRouteSetting = (props) => {
    
    //this is the function for the back button
    //if no input then set the auto to default true
    const { lat, lon, city } = props.userInfoInput
    function back() {
        if ( (!lat && !lon) && !city ) {
            props.setIsAutoLocation(true)
        }
        props.setOnSetting(false)
    }

    function latOnChange(lat) {
        props.setIsInputValid(false)
        props.setGeolocationInput(lat, props.userInfoInput.lon)
        
        const latRegex = /^[-]?[0-9]{1,2}([.][0-9]{1,6})?$/
 
        if (lat) {
            if (latRegex.test(lat) && lat.length > 0) {
                props.setIsInputValid(true)
            } else {
                props.setIsInputValid(false)
            }
        }
    }

    function lonOnChange(lon) {
        props.setIsInputValid(false)
        props.setGeolocationInput(props.userInfoInput.lat, lon)
        
        const lonRegex = /^[-]?[0-9]{1,3}([.][0-9]{1,6})?$/

        if (lon) {
            if (lonRegex.test(lon) && lon.length > 0) {
                props.setIsInputValid(true)
            } else {
                props.setIsInputValid(false)
            }
        }
    }

    function cityOnChange(city) {
        props.setIsInputValid(false)
        props.setCityInput(city)
        
        const cityRegex = /^[a-zA-Z\s]{0,}$/

        if (city) {
            if (cityRegex.test(city) && city.length > 0) {
                props.setIsInputValid(true)
            } else {
                props.setIsInputValid(false)
            }
        }
    }

    const cityName = props.weatherInfo.location.city
    const countryName = props.weatherInfo.location.country

    let text = <>
        <p>current location:</p>
        <h3 className={css.current_location}>{`${cityName}, ${countryName}`}</h3>
    </>

    if (!props.userInfo.location.auto) {
        text = (props.userInfo.location.method.byCity)
                    ? <>
                        <Toggler 
                            text='City:' 
                            changed={props.toggleLocationMethod}
                            bind={props.userInfo.location.method.byGeo}  />
                        <p>City Name:</p>
                        <PromptInput 
                            type='text'
                            name='city' 
                            maxLength='30'
                            value={props.userInfoInput.city}
                            placeholder={props.weatherInfo.location.city}
                            isInputValid={props.isInputValid}
                            changed={(e) => cityOnChange(e.target.value)}
                            blured={(e) => props.cityRegexAndSubmit(e.target.value)} />   
                        </>
                    : <>                        
                        <Toggler 
                            text='Geolocation:' 
                            changed={props.toggleLocationMethod}
                            bind={props.userInfo.location.method.byGeo}  />
                        <p>Latitude:</p>
                        <PromptInput 
                            type='text' 
                            name='lat' 
                            value={props.userInfoInput.lat}
                            placeholder={props.userInfo.location.lat}
                            isInputValid={props.isInputValid}
                            changed={(e) => latOnChange(e.target.value)}
                            blured={(e) => props.latRegex(e.target.value)} />   
                        <p>Longitude:</p>
                        <PromptInput 
                            type='text' 
                            name='lon' 
                            value={props.userInfoInput.lon}
                            placeholder={props.userInfo.location.lon}
                            isInputValid={props.isInputValid}
                            changed={(e) => lonOnChange(e.target.value)}
                            blured={(e) => props.lonRegexAndSubmit(e.target.value)} />   
                    </>
    }



    return (
        <>
            <div className={css.inputContainer}>
                <Toggler 
                    text='Night Mode:' 
                    changed={props.toggleIsNightMode}
                    bind={props.isNightMode} />
                <Toggler 
                    text='Auto Location:' 
                    changed={props.onSetAuto}
                    bind={props.userInfo.location.auto} />
                {text}
            </div>   
            <AuthBtn 
                text='Save Default' 
                btnType='pf_confirm' 
                clicked={props.saveDefault} />              
            <AuthBtn 
                text='Back' 
                btnType='pf_cancel' 
                clicked={back} />
        </>
    )
}

export default OnRouteSetting

