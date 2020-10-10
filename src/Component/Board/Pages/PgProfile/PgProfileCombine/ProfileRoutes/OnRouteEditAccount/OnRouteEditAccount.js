import React from 'react'
import AuthBtn from '../../../../../../UI/AuthBtn/AuthBtn'

const OnRouteEditAccount = (props) => {
    return (
        <>
            <AuthBtn 
                text='Change Password'
                btnType='pf_fixed' 
                clicked={() => props.setOnChangePassword(true)} />
            <AuthBtn 
                text='Change User Name'
                btnType='pf_fixed'
                clicked={() => props.setOnChangeName(true)} />
            <AuthBtn 
                text='Back'
                btnType='pf_cancel' 
                clicked={() => props.setOnEditAccount(false)} />
        </>
    )
}

export default OnRouteEditAccount
