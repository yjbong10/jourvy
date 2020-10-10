import React, { useState } from 'react'
import { useEffect } from 'react'
import css from './Toggler.module.css'

const Toggler = (props) => {
    //this is for two way binding
    const [checked, setChecked] = useState(false)

    //if bind thats mean there is more than one way to control the toggler state
    const { bind } = props //if no bind pass from parent then its will be undefined

    useEffect(() => {
        if (bind) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, [bind])

    return (
        <div className={css.toggler}>
            <p>{props.text}</p>
            {
                (bind === undefined)
                ?   <input type="checkbox" onChange={() => props.changed()}/>
                :   <input type="checkbox" checked={checked} onChange={() => props.changed()}/>

            }

        </div>
    )
}

export default Toggler
