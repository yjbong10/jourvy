import React from 'react'
import css from './HIcon.module.css'
import sprite from '../../../../assets/sprite.svg'

const HIcon = (props) => {
    let type;
    switch(props.type){
        case 'menu':
            type = css.menu_icon
            break;
        case 'search':
            type = css.search_icon
            break;

        case 'lg':
            type = css.icon_lg
            break;
            
        case 'sm':
            type = css.icon_sm
            break;

        case 'rg':
        default: 
            type = css.icon
            break;
    }   


    return (
        <svg className={type} onClick={props.clicked}>
            <use href={sprite + `${props.name}`}/>
        </svg>
    )
}

export default HIcon
