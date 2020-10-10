import React from 'react'
import css from './OnRouteChangeName.module.css'
import AuthBtn from '../../../../../../UI/AuthBtn/AuthBtn'
import PromptInput from '../../../../../../UI/PromptInput/PromptInput'

const OnRouteChangeName = (props) => {
    return (
        <>
            <div className={css.inputContainer}>
                <p>current name:</p>
                <h1 className={css.currentName}>{props.userData.name}</h1>
                <p>new name:</p>
                <PromptInput 
                type='text' 
                value={props.userAuth.newName}
                changed={(e) => props.setNewNameInput(e.target.value)}
                submited={props.onChangeName}
                /> 
            </div>
            <AuthBtn 
                text='Confirm' 
                btnType='pf_confirm' 
                clicked={props.onChangeName} />
            <AuthBtn 
                text='Back' 
                btnType='pf_cancel' 
                clicked={() => props.setOnChangeName(false)} />
        </>
    )
}

export default OnRouteChangeName
