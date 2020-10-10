import React from 'react'
import HIcon from '../HIcon/HIcon'
import css from './Search.module.css'

const Search = (props) => {
    return (
        <form className={css.search}>
            <input type="text" placeholder='Search Post' onChange={props.changed} value={props.searchValue} />
            <button className={css.search_btn}>
                <HIcon name="#search" type="search"/>
            </button>
        </form>
    )
}

export default Search
