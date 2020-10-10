import React from 'react';
import css from './Sidebar.module.css';
import sprite from '../../assets/sprite.svg';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
    let style = [css.container]
    if (!props.isSideBarShow) { style = [css.container, css.disable].join(' ') }

    return (
      <div className={style}>
        <nav className={css.sidebar}>
            <ul className={css.ul}>
                <NavLink to="/" exact 
                  activeClassName={css.current} 
                  className={`${css.li}`}>
                    Home
                </NavLink>

                <NavLink to="/diary" 
                  activeClassName={css.current} 
                  className={`${css.li}`}>
                    Diary
                  <svg className={css.chevron_right_icon}>
                    <use href={sprite + '#chevron-right'}></use>
                  </svg>
                </NavLink>

                <NavLink to="/profile" exact 
                  activeClassName={css.current} 
                  className={`${css.li}`}>
                    Profile
                  <svg className={css.chevron_right_icon}>
                    <use href={sprite + '#chevron-right'}></use>
                  </svg>
                </NavLink>
                <NavLink to="/logout" exact 
                  activeClassName={css.current} 
                  className={`${css.li}`}>
                    LogOut
                  <svg className={css.logout_icon}>
                    <use href={sprite + '#sign-out-alt'}></use>
                  </svg>
                </NavLink>
                <NavLink to="/about" exact
                  activeClassName={css.current} 
                  className={`${css.li}`}>
                    About
                  <svg className={css.chevron_right_icon}>
                    <use href={sprite + '#info'}></use>
                  </svg>
                </NavLink>
                <NavLink to="/terms-of-use" exact 
                activeClassName={css.current} 
                className={`${css.li}`}>
                  Terms of Use
                </NavLink>
            </ul>
            <footer className={css.footer}>&copy; Copyright 2020 Jourvy</footer>
        </nav>
      </div>
    );
}

export default Sidebar;

