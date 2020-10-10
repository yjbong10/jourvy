import React from 'react';
import css from './PromptBtn.module.css'

const PromptBtn = (props) => {

    let style = [css.btn]
    if(props.type === 'cancel'){ style = [css.btn, css.cancel].join(' ') }
    if(props.type === 'submit'){ style = [css.btn, css.submit].join(' ') }
    if(props.type === 'cta') { style = [css.btn, css.cta].join(' ') }

    return (
        <>
            <button className={style} onClick={props.clicked}>{props.text}</button>
        </> 
    )
}

export default PromptBtn
