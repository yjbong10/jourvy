import React from 'react'
import css from './Temperature.module.css'
import { connect } from 'react-redux';
import Loading from '../../../../UI/Loading/Loading';

const Temperature = (props) => {

    const LoadingStyle = {"alignSelf": "end"}
    let tempRender = <Loading style={LoadingStyle} />

    let minMaxRender = <p className={css.text}>Min: -- &nbsp;&nbsp; Max: --</p>


    const temperature = parseFloat(props.temp).toFixed(1)
    const feels_like = parseFloat(props.feels_like).toFixed(1)
    

    if (!props.isWeatherLoad && temperature !== 'NaN' && feels_like!== 'NaN') {
        tempRender = <>
            <h1 className={css.temp}>{temperature}</h1>
            <p className={css.symbol}> &#176;C </p>
        </>
        minMaxRender =  <>
            <p className={`${css.text} ${css.visible}`}>Min: {props.temp_min} &nbsp;&nbsp; Max: {props.temp_max}</p>
            <p className={`${css.text} ${css.invisible}`}>Feels like: {feels_like}</p>
        </>
    }

    return (
        <div className={css.container}>
            <div className={css.temp_Container}>
                {tempRender}
            </div>
            <div className={css.title}>
                {minMaxRender}
                <h4 className={css.description}>Temperature</h4>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        temp: state.weatherInfo.weather.temp,
        feels_like: state.weatherInfo.weather.feels_like,
        temp_min: state.weatherInfo.weather.temp_min,
        temp_max: state.weatherInfo.weather.temp_max,
        isWeatherLoad: state.isWeatherLoad
    }
}

export default connect(mapStateToProps)(Temperature)