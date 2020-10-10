import React from 'react'
import sprite from '../../../assets/sprite.svg'
import css from './NextButton.module.css'

const NextButton = (props) => {
    return (
        <>  
            <svg 
                className={[css.arrow_icon, css[props.color], css[props.bgColor]].join(' ')}
                onClick={props.clicked}>
                <use href={sprite + '#angle-double-right'}></use>
            </svg>
        </>
    )
}

export default NextButton
