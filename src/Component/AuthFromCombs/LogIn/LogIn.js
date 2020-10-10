import React from 'react'
import css from './LogIn.module.css';
import AuthBtn from '../../UI/AuthBtn/AuthBtn';
import AuthForm from '../../UI/AuthForm/AuthForm';
import AuthInput from '../../UI/AuthInput/AuthInput';
import ErrorCard from '../../UI/ErrorCard/ErrorCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsShow } from '../../../store/action/ui_action';

const LogIn = (props) => {
    return (
        <>
            <AuthForm submited={(e) => props.submit(e, props.email, props.password)}>
                
                <AuthInput 
                    label='Email'                            
                    type="text" 
                    id="email" 
                    value={props.email} 
                    changed={(e) => props.setEmailInput(e.target.value)}                        
                    />
                <AuthInput 
                    label='Password'                            
                    type="password" 
                    id="password" 
                    value={props.password} 
                    changed={(e) => props.setPasswordInput(e.target.value)}        
                    />

                {(props.isShow) && <ErrorCard msg={props.error} />}

                <AuthBtn text="Log In"></AuthBtn>
                <Link to='/register' className={css.link} onClick={() => props.setIsShow(false)}>Register</Link>
            </AuthForm>
        </>
    )
}
 
const mapStateToProps = (state) => {
    return {
        name: state.userAuth.name,
        email: state.userAuth.email,
        password: state.userAuth.password,
        isShow: state.isShow,
        error: state.error.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsShow: (status) => dispatch(setIsShow(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
