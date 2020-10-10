import React from 'react'
import css from './Prompt.module.css'
import PromptBtn from '../PromptBtn/PromptBtn';
import PromptInput from '../PromptInput/PromptInput';
import { useEffect } from 'react';

const Prompt = (props) => {
    // clear user password input everytime prompt dismount 
    useEffect(() => {
        return () => {
            props.clearAuthInput()
        }
        // eslint-disable-next-line
    }, [])


    function onVerify() {
        props.setProgress(10)
        props.setIsShow(false);
        //pass from board from from Home.js
        if (props.userPasswordInput.length === 0) {
            props.setProgress(100)
            setTimeout(() => {
                props.setIsShow(true);
                props.setError('Please enter your password.', 'warn')
            }, 1)
    
        } else {
            props.setIsShow(false);
            fetch('http://192.168.0.171:3001/verify', {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    //pass from board from from Home.js
                    email: props.userEmail,
                    password: props.userPasswordInput
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    props.setPrompt(true, props.prompt.message, false, false)
                    props.setProgress(100)
                } else {
                    props.setProgress(70)
                    props.setPrompt(false)
                    props.setIsShow(true);
                    props.setError('wrong password! Loging out...', 'warn')
                    setTimeout(() => {
                        props.history.push('/logout')
                        props.setProgress(100)
                    }, [3000])
                }
            })
        }
    }



let render = <>   
                    <h1 className={css.message}>{props.prompt.message}</h1> 
                    <div className={css.btn}>
                        <PromptBtn text='Yes' clicked={props.onConfirm}/>
                        <PromptBtn text='Cancel' type='cancel' clicked={props.onCancel} />
                    </div>
                </>


// show verify if setPrompt needVerify set to true
if (props.prompt.needVerify) {
    render = <>
                <h1 className={css.pass_message}>Please enter password to continue.</h1> 
                {(!props.isShow) 
                    ? <p className={css.pass_subMessage}>You will be log out once password is entered wrong.</p> 
                    : <p className={css.pass_subMessage}>Please enter your password.</p>}
                <div className={css.pass_btn}>
                    <PromptInput type='password' changed={(e) => props.setPasswordInput(e.target.value)}/>
                    <PromptBtn text='Conitnue' type='cancel' clicked={onVerify} />
                </div>
            </>
}

    return (
        <div className={css.container}>
            {render}
        </div>
    )
}

export default (Prompt)

