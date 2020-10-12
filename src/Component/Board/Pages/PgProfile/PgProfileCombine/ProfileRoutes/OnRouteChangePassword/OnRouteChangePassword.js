import React from 'react'
import css from './OnRouteChangePassword.module.css'
import AuthBtn from '../../../../../../UI/AuthBtn/AuthBtn'
import PromptInput from '../../../../../../UI/PromptInput/PromptInput'

const OnRouteChangePassword = (props) => {
    return (
        <>
            <div className={css.inputContainer}>
                <p>current password:</p>
                <PromptInput 
                type='password' 
                name='oldPassword'
                value={props.userAuth.password}
                changed={(e) => props.setPasswordInput(e.target.value)}/> 
                <p>new password:</p>
                <PromptInput 
                type='password'
                name='newPassword'
                value={props.userAuth.newPassword}
                changed={(e) => props.setNewPasswordInput(e.target.value)}
                submited={() => props.setPrompt(
                    true, 
                    'Are you sure you want to change your password?',
                    'CHANGE_PASSWORD')}
                /> 
            </div>
            <AuthBtn 
                text='Confirm' 
                btnType='pf_confirm' 
                clicked={() => props.setPrompt(
                    true, 
                    'Are you sure you want to change your password?',
                    'CHANGE_PASSWORD')} />
            <AuthBtn 
                text='Back' 
                btnType='pf_cancel' 
                clicked={() => props.setOnChangePassword(false)} />
        </>
    )
}

export default OnRouteChangePassword
