import React from 'react';
import css from './Weather.module.css';
import solid from '../../../../../assets/solid.svg';
import regular from '../../../../../assets/regular.svg';
import { connect } from 'react-redux';
import Loading from '../../../../UI/Loading/Loading';

const Weather = (props) => {
    const { id } = props;
    let weatherIcon = null;
    let Sprite = null;
    let weatherShown;
    let iconClass;
    switch (true) {
        
        case (id >= 200 && id <= 232):
            weatherIcon = '#thunderstorm'
            Sprite = regular  
            weatherShown = 'thunderstorm'
            iconClass = [css.thunderstorm_icon]
            break;

        case (id >= 300 && id <= 321):
            weatherIcon = '#cloud-drizzle'
            Sprite = regular
            weatherShown = 'drizzle'
            iconClass = [css.rain_icon]
            break;
        
        case (id >= 500 && id <= 511):
            weatherIcon = '#cloud-rain'
            Sprite = regular
            weatherShown = 'rain'
            iconClass = [css.rain_icon]
            break;
        
        case (id >= 520 && id <= 531):
            weatherIcon = '#cloud-showers'
            weatherShown = 'showers rain'
            Sprite = regular
            iconClass = [css.rain_icon]
            break;
        
        case (id >= 600 && id <= 622):
            weatherIcon = '#cloud-snow'
            weatherShown = 'snow'
            Sprite = regular
            iconClass = [css.snow_icon]
            break;
        
        case (id >= 701 && id <= 762):
            weatherIcon = '#fog'
            Sprite = solid
            weatherShown = 'mist'
            iconClass = [css.cloud_icon]
            break;
        
        case (id >= 771 && id <= 781):
            weatherIcon = '#wind-warning'
            Sprite = regular
            weatherShown = 'heavy wind'
            iconClass = [css.wind_icon]
            break;
        
        case (id >= 800 && id <= 801):
            weatherIcon = '#sun'
            Sprite = solid
            weatherShown = (id === 800) ? 'clear sky' : 'Mosty Clear Sky'
            iconClass = [css.sun_icon]
            break;

        case (id >= 802 && id <= 803):
            weatherIcon = '#cloud'
            Sprite = regular
            weatherShown = 'cloudy'
            iconClass = [css.cloud_icon]
            break;
        
        case (id === 804):
            weatherIcon = '#clouds'
            Sprite = solid
            weatherShown = 'overcast clouds'
            iconClass = [css.cloud_icon]
            break;
    
        default:
            break;
    }

    const LoadingStyle = {"alignSelf": "end"}
    let weatherIconRender = <Loading childStyle={LoadingStyle} />

    let weatherTextRender = <></>

    if (!props.isWeatherLoad && !isNaN(id)) {
        weatherIconRender = <>
            <svg className={iconClass}>
                <use href={Sprite + weatherIcon}/>
            </svg>
        </>

        weatherTextRender = <>
            <p className={`${css.text} ${css.visible}`}>{weatherShown}</p>
            <p className={`${css.text} ${css.invisible}`}>{props.description}</p>
            {(props.city && props.country) && <h4 className={css.city}>{props.city}, {props.country}</h4>}
        </>
    }


    return (
        <div className={css.container}>
            {weatherIconRender}
            <div className={css.title}>
                {weatherTextRender}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        id: state.weatherInfo.weather.id,
        weather: state.weatherInfo.weather.main,
        description: state.weatherInfo.weather.description,
        city: state.weatherInfo.location.city,
        country: state.weatherInfo.location.country,
        isWeatherLoad: state.isWeatherLoad
    }
}

export default connect(mapStateToProps)(Weather)
