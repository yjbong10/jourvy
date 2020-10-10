import React, { useState, useEffect } from 'react';
import css from './PgHome.module.css'
import LeftBar from './LeftBar/LeftBar';
import Temperature from './Temperature/Temperature';
import Weather from './Weather/Weather';
import AddPost from './AddPost/AddPost';
import { connect } from 'react-redux';
import { setProgress, setIsWeatherLoad, setIsShow, setError } from '../../../../store/action/ui_action';
import { setWeatherInfo } from '../../../../store/action/weather_action';

const PgHome = (props) => {

  useEffect(() => {
    props.setProgress(10)
    props.setIsWeatherLoad(true)
    fetch('https://jourvy-server.herokuapp.com/weather', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          lat: props.location.lat,
          lon: props.location.lon,
          city: props.location.city
      })
  })
    .then(res => res.json())
    .then(data => {
      if(data.weather){
        const { id, main, description } = data.weather[0]
        const { temp, feels_like, temp_min, temp_max } = data.main
        const { country } = data.sys
        const city = data.name
        props.setWeatherInfo(id, main, temp, feels_like, temp_min, temp_max, description, country, city)
      } else {
        console.log(data.message)
      }
    props.setProgress(100)
    props.setIsWeatherLoad(false)
    }) 
    .catch(err => {
      props.setIsWeatherLoad(true)
      props.setIsShow(true)
      props.setError('something is wrong. :(', 'warn')
      props.setProgress(100)
    }) 
  props.setProgress(50)
  props.setIsWeatherLoad(true)
  // eslint-disable-next-line
  }, [])


  

  const [Greet, setGreet] = useState('');
  const date = new Date()
  const hour = date.getHours();
  useEffect(() => {
    if (hour >= 18 && hour < 24) {
      setGreet('Good evening, ')
    } else if (hour >= 12){
      setGreet('Good afternoon, ')
    } else {
      setGreet('Good morning, ')
    }
  }, [hour])

  const [Time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const time = date.toLocaleTimeString()
      setTime(time)
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  }, [Time, date])

  return (
    <main className={css.main}>
      <div className={`${css.item1} ${css.shadow} ${css.itm_color} ${css.sun_img}`}>
        <Weather />
      </div>
      <div className={`${css.item2} ${css.shadow} ${css.itm_color} ${css.sun_img}`}>
        <Temperature />
      </div>
      <div className={`${css.item3} ${css.shadow} ${css.itm_color} ${css.sun_img}`}>
        <LeftBar time={Time} />
      </div>
      <div className={`${css.item4} ${css.shadow} ${css.itm_color} ${css.dairy_img}`}>
        <AddPost {...props} greet={Greet}/>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    name: state.userData.name,
    email: state.userData.email,
    isWeatherLoad: state.isWeatherLoad,
    location: state.userInfo.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setProgress: (num) => dispatch(setProgress(num)),
      setWeatherInfo: (id, main, temp, feels_like, temp_min, temp_max, description, country, city) => 
        dispatch(setWeatherInfo(id, main, temp, feels_like, temp_min, temp_max, description, country, city)),
      setIsWeatherLoad: (status) => dispatch(setIsWeatherLoad(status)),
      setIsShow: (status) => dispatch(setIsShow(status)),
      setError: (error, status) => dispatch(setError(error, status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PgHome);

