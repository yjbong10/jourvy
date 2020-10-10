import React from 'react'
import css from './PromptInput.module.css'

const PromptInput = (props) => {

    let inputStyle = [css.promptInput] 
    if (props.isInputValid === false && props.isInputValid !== undefined) {
        inputStyle = [css.promptInput, css.notValid].join(' ')
    } else if (props.isInputValid === true){
        inputStyle = [css.promptInput]
    }

    function onSubmit(e) {
        e.preventDefault()
        if ( props.submited ) {
            props.submited()
        }
    }

    return (
        <form className={css.form} onSubmit={onSubmit}>
                <input 
                    className={inputStyle}
                    onChange={props.changed}
                    value={props.value}
                    type={props.type} 
                    id={props.name || props.type} 
                    name={props.name || props.type}
                    maxLength={props.maxLength || "20"}
                    placeholder={props.placeholder}
                    onBlur={props.blured}
                    autoComplete="off"/>
        </form>
    )
}

export default PromptInput
