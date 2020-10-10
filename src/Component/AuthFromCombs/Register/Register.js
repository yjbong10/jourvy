import React, { useEffect } from 'react'
import css from '../LogIn/LogIn.module.css';
import AuthBtn from '../../UI/AuthBtn/AuthBtn';
import AuthForm from '../../UI/AuthForm/AuthForm';
import AuthInput from '../../UI/AuthInput/AuthInput';
import ErrorCard from '../../UI/ErrorCard/ErrorCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsShow, setIsInputValid } from '../../../store/action/ui_action';

const Register = (props) => {
    //clean user password when navigating here from login
    useEffect(() => {
        props.setPasswordInput('')
       //eslint-disable-next-line
    },[])

    function nameOnchange(input) {
        props.setIsInputValid(false)
        props.setNameInput(input)

        const nameRegex = /^[\w][a-z\d]{3,15}$/gi;

        if(nameRegex.test(input) && input.length > 0) {
            props.setIsInputValid(true)
        } else {
            props.setIsInputValid(false)
        }
    }

    function emailOnchange(input) {
        props.setIsInputValid(false)
        props.setEmailInput(input)
        
        const emailRegex = /^[\w\d]{3,}@[\w]{3,}.[\w]{2,10}(.[\w]{2,10})?$/gi;

        if(emailRegex.test(input) && input.length > 0) {
            props.setIsInputValid(true)
        } else {
            props.setIsInputValid(false)
        }
    }

    function passwordOnChange(input) {
        props.setIsInputValid(false)
        props.setPasswordInput(input)

        const passwordRegex = /^.[^\s]{5,15}$/gi;

        if(passwordRegex.test(input) && input.length > 0) {
            props.setIsInputValid(true)
        } else {
            props.setIsInputValid(false)
        }
    }

    return (
        <>
            <AuthForm submited={(e) => props.submit(e, props.name, props.email, props.password)}>
                        <AuthInput 
                            label='Name'                            
                            type="text" 
                            id="name" 
                            value={props.name} 
                            isInputValid={props.isInputValid}
                            changed={(e) => nameOnchange(e.target.value)} 
                            />
                        <AuthInput 
                            label='Email'                            
                            type="text" 
                            id="email" 
                            value={props.email} 
                            isInputValid={props.isInputValid}
                            changed={(e) => emailOnchange(e.target.value)} 
                            />
                        <AuthInput 
                            label='Password'                            
                            type="password" 
                            id="password" 
                            value={props.password} 
                            isInputValid={props.isInputValid}
                            changed={(e) => passwordOnChange(e.target.value)} 
                            />

                        {(props.isShow) && <ErrorCard msg={props.error} />}
                        
                        <AuthBtn text="Register"></AuthBtn>
                        <Link to='/login' className={css.link} onClick={() => props.setIsShow(false)}>Log In</Link>
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
        error: state.error.message,
        isInputValid: state.isInputValid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsShow: (status) => dispatch(setIsShow(status)),
        setIsInputValid: (status) => dispatch(setIsInputValid(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
