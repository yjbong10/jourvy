import React from 'react';
import css from './Header.module.css';
import HIcon from '../UI/HeaderUI/HIcon/HIcon';
import Search from '../UI/HeaderUI/Search/Search';

const Header = (props) => {

    function msgOnClick() {
        props.setIsShow(true)
        props.setError('this feature is not yet been implemented.')
    }

    function onChange(e) {
        props.setSearchInput(e.target.value)
        props.history.replace('/diary')
    }

    function onNightMode() {
        props.setProgress(100)
        props.toggleIsNightMode()
    }

    function onUserBtnClick() {
        props.history.replace('./profile')
        props.setOnEditAccount(true)
    }

    return (
        <header className={css.header}>
            <p className={css.logo}>JOURVY</p>
            <HIcon name="#bars" type="menu" clicked={props.togglerIsSidebarShow}/>
            <Search changed={onChange} searchValue={props.searchInput} />
            <div className={css.user}>
                <HIcon name="#moon" type="sm" clicked={onNightMode}/>
                <HIcon name="#comment-alt" type="sm" clicked={msgOnClick}/>
                <HIcon name="#user" type="rg" clicked={onUserBtnClick}/>
            </div>
        </header>
    );
}

export default Header;

