import React from 'react';
import css from './AuthBtn.module.css'

const AuthBtn = (props) => {

    let style = [css.btn]
    if (props.btnType === 'pf_confirm' ) {
        style = [css.btn, css.pf_confirm].join(' ')
    }

    if (props.btnType === 'pf_cancel' ) {
        style = [css.btn, css.pf_cancel].join(' ')
    }

    if (props.btnType === 'pf_fixed' ) {
        style = [css.btn, css.pf_fixed].join(' ')
    }

    return (
        <>
            <button className={style} onClick={props.clicked}>{props.text}</button>
        </> 
    )
}

export default AuthBtn
