import React from 'react';
import css from './AuthForm.module.css';

const AuthForm = (props) => {
    return (
        <>
            <form className={css.form} onSubmit={props.submited}>
                {props.children}
                <p className={css.footer}>&copy; Copyright 2020 Jourvy</p>
            </form>
        </>
    )
}

export default AuthForm
