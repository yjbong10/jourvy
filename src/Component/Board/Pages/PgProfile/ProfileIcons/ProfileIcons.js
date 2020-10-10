import React from 'react'
import css from './ProfileIcons.module.css'
import sprite from '../../../../../assets/solid.svg'

const ProfileIcons = (props) => {
    return (
        <>
            <button className={css.btn} onClick={props.clicked}>       
                <p>{props.text}</p>
                <div>                
                    <svg className={css.icon}>
                        <use href={sprite + `${props.name}`}/>
                    </svg>
                </div> 
            </button>
        </>
    )
}

export default ProfileIcons
