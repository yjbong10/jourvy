import React from 'react';
import css from './AuthInput.module.css';

const AuthInput = (props) => {

    let style = [css.input] 
    if (props.isInputValid === false && props.isInputValid !== undefined) {
        style = [css.input, css.notValid].join(' ')
    } else if (props.isInputValid === true){
        style = [css.input]
    }

    return (
        <>
            <label htmlFor={props.type} >{props.label}</label>
                <input 
                    className={style}
                    type={props.type} 
                    id={props.id} 
                    name={props.id} 
                    value={props.value} 
                    onChange={props.changed}
                    autoComplete="off"/>
        </>
    )
}

export default AuthInput