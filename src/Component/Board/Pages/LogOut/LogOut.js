import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setLogOut, clearAuthInput } from '../../../../store/action/userAuth_action';
import { clearCurrentPost, clearUserPosts, clearPostInput } from '../../../../store/action/post_action';
import { setProgress, setError, setIsShow, clearIsNightMode } from '../../../../store/action/ui_action';
import { clearWeatherInfo } from '../../../../store/action/weather_action';
import { clearUserInfo, clearUserInfoInput } from '../../../../store/action/userInfo_action'

const LogOut = (props) => {
    useEffect(() => {
        props.setProgress(10)
        fetch('https://jourvy-server.herokuapp.com/logout', {
            credentials: 'include',
        }).then(res => {
                if (res) {
                    props.clearWeatherInfo()
                    props.clearCurrentPost()
                    props.clearUserPosts()
                    props.clearAuthInput()
                    props.clearPostInput()
                    props.clearUserInfo()
                    props.clearUserInfoInput()
                    props.clearIsNightMode()
                    props.setLogOut()
                    props.setError(null)
                    props.setProgress(100)
                }
            })
            .catch(err => {
                props.setIsShow(true)
                props.setError('something is wrong. :(', 'warn')
                props.history.go(-1)
                props.setProgress(100)
            })
            props.setProgress(35, 'add')
        // eslint-disable-next-line
    }, [])

    return (
        <>
            
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLogOut: () => dispatch(setLogOut()),
        clearCurrentPost: () => dispatch(clearCurrentPost()),
        clearUserPosts: () => dispatch(clearUserPosts()),
        clearAuthInput: () => dispatch(clearAuthInput()),
        clearPostInput: () => dispatch(clearPostInput()),
        clearWeatherInfo: () => dispatch(clearWeatherInfo()),
        setProgress: (num, method) => dispatch(setProgress(num, method)),
        setIsShow: (status) => dispatch(setIsShow(status)),
        setError: (error, status) => dispatch(setError(error, status)),
        clearUserInfo: () => dispatch(clearUserInfo()),
        clearUserInfoInput: () => dispatch(clearUserInfoInput()),
        clearIsNightMode: () => dispatch(clearIsNightMode())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(LogOut))
