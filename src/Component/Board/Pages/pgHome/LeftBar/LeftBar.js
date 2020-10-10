import React from 'react';
import Calendar from 'react-calendar'; //third party component 
import './Calendar.css'; //copied css to overite original style
import css from './LeftBar.module.css'
import Loading from '../../../../UI/Loading/Loading';

const LeftBar = (props) => {
    let time = <>
        <Loading /> 
    </>

    if(props.time) {time = <h1 className={css.time}>{props.time}</h1>}

    return (
        <div className={css.container}>
            <Calendar className={css.calendarWrapper}/>
            <div className={css.timeWrapper}>
                {time}
            </div>
        </div>
    )
}

export default LeftBar;