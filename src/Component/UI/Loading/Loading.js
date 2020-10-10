import React from 'react'
import css from './Loading.module.css'
import light from '../../../assets/light.svg'

const Loading = (props) => {
    return (
        <svg className={css.loading} style={props.childStyle}>
            <use href={light + '#sync'}/>
        </svg>
    )
}

export default Loading
