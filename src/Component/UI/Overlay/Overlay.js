import React from 'react'
import css from './Overlay.module.css'

const Overlay = (props) => {
    return (
        <div className={css.overlay} onClick={props.clicked} />
    )
}

export default Overlay
