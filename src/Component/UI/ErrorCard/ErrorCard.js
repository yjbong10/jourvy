import React from 'react'
import css from './ErrorCard.module.css'

const ErrorCard = (props) => {
    return (
        <>
            <div className={css.container}>{props.msg}</div>
        </>
    )
}

export default ErrorCard
