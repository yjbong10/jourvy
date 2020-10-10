import React from 'react'
import css from './Items.module.css'

const Items = (props) => {
    return (
        <div className={css.items}>    
            <p><strong>{props.top}</strong></p>
            <p>{props.bottom}</p>
        </div>
    )
}

export default Items
