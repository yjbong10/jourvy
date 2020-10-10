import React, { useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import css from './Home.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Board from '../Board/Board';
import { connect } from 'react-redux';
import { setSearchInput } from '../../store/action/post_action'
import { togglerIsSidebarShow, toggleIsNightMode, setProgress } from '../../store/action/ui_action';
import { setIsShow, setError, setIsSidebarShow, setPrompt, setPromptIsConfirm } from '../../store/action/ui_action';
import { setPasswordInput, clearAuthInput } from '../../store/action/userAuth_action';
import { setOnEditAccount } from '../../store/action/ui_action';

const Home = (props) => {

  //redirect to '/' when came from '/login'
  useEffect(() => { 
    props.history.push('/')
    // eslint-disable-next-line
  },[])


  //hide sidebar and overlay everytime route changed
  let location = useLocation() 
  useEffect(() => {
    props.setIsSidebarShow(false)
    props.setPrompt(false)
    // eslint-disable-next-line
  },[location.pathname])


  //check isNightMode on localStorage
  useEffect(() => { 
    const localStore = window.localStorage
    const isNightMode = (JSON.parse(localStore.getItem('isNightMode')))
    if (isNightMode) {
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  return (
    <div className={css.container}>
      <Header {...props} />
      <section className={css.content}>
        <Sidebar isSideBarShow={props.isSideBarShow}/>
        <Board {...props}/>
      </section>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {

    //v//these all pass down to everyone here for sidebar, overlay and prompt
    isSideBarShow: state.isSideBarShow,


    //v//these only pass down to board and headers for infocard and prompt
    isShow: state.isShow,
    error: state.error.message,
    prompt: state.prompt,


    //these only pass down to headers
    searchInput: state.searchInput,

    //these only pass to board and to prompt for verify
    userEmail: state.userData.email,
    userPasswordInput: state.userAuth.password 
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    //v//these all pass down to everyone here for sidebar, overlay and prompt
    togglerIsSidebarShow: () => dispatch(togglerIsSidebarShow()),
    setIsSidebarShow: (status) => dispatch(setIsSidebarShow(status)),

    //v//these only pass down to board and headers for infocard and prompt
    setIsShow: (status) => dispatch(setIsShow(status)),
    setError: (error, status) => dispatch(setError(error, status)),
    setPrompt: (status, message) => dispatch(setPrompt(status, message)),
    setPromptIsConfirm: (status) => dispatch(setPromptIsConfirm(status)),
    clearAuthInput: () => dispatch(clearAuthInput()),


    //these only pass down to headers for search and nightmode
    setSearchInput: (input) => dispatch(setSearchInput(input)),
    toggleIsNightMode: () => dispatch(toggleIsNightMode()),
    setProgress: (num) => dispatch(setProgress(num)),

    //these only pass to board and to prompt for verify
    setPasswordInput: (input) => dispatch(setPasswordInput(input)),

    //these actualy only headers will use
    setOnEditAccount: (status) => dispatch(setOnEditAccount(status))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

