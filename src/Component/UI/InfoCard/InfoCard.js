import React, { useState, useEffect } from 'react'
import css from './InfoCard.module.css'
import { connect } from 'react-redux';
import { setIsShow, setError } from '../../../store/action/ui_action';

const InfoCard = (props) => {
    const { setIsShow, setError } = props;

    const [Hide, setHide] = useState(false)
    const [Fade, setFade] = useState(false)


    useEffect(() => {
        const fadeTimeout = setTimeout(() => {
            setFade(true)
        }, 4000);
        const hideTimeout = setTimeout(() => {
            setHide(true)
            setIsShow(false)
            setError(null)
        }, 5000);
    
        return () => {
           clearTimeout(fadeTimeout);
           clearTimeout(hideTimeout);
           setIsShow(false)
           setError(null)
        }
        // eslint-disable-next-line 
      }, []);


    let style = [css.container]
    if (props.errorStatus === 'warn') {style = [css.container, css.warning].join(' ')}
    if (Fade) {style = [style, css.fade].join(' ')}
    if (Hide) {style = [style, css.fade, css.hide].join(' ')}

    function onHide() {
        setHide(true)
        setIsShow(false)
        setError(null)
    }

    return (
        <div className={style} onClick={onHide}>{props.msg}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorStatus: state.error.status
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setIsShow: (status) => dispatch(setIsShow(status)),
        setError: (error, status) => dispatch(setError(error, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCard)
