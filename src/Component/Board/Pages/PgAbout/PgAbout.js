import React, { useState, useEffect } from 'react';
import css from './PgAbout.module.css';
import Pg1 from './Pg1/Pg1';
import Pg2 from './Pg2/Pg2';
import { connect } from 'react-redux';
import { setIsShow, setError } from '../../../../store/action/ui_action'

const PgAbout = (props) => {

  useEffect(() => {
    setTimeout(() => {
      props.setIsShow(true)
      props.setError("Don't take any of this seriously! :)")
    }, 3000)
    // eslint-disable-next-line
  }, [])
  

  const [IsPg1Show, setIsPG1Show] = useState(true)

  return (
    <div className={css.container}>
        <Pg1 setIsPG1Show={setIsPG1Show}/>
        <Pg2 IsPg1Show={IsPg1Show}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsShow: (status) => dispatch(setIsShow(status)),
    setError: (error, status) => dispatch(setError(error, status))
  }
}

export default connect(null, mapDispatchToProps)(PgAbout)
