import React from 'react'
import css from './PgProfileCombine.module.css'
import HIcon from '../../../../UI/HeaderUI/HIcon/HIcon'
import Items from '../Items/Items'
import ProfileIcons from '../ProfileIcons/ProfileIcons'
import OnRouteEditAccount from './ProfileRoutes/OnRouteEditAccount/OnRouteEditAccount'
import OnRouteChangePassword from './ProfileRoutes/OnRouteChangePassword/OnRouteChangePassword'
import OnRouteChangeName from './ProfileRoutes/OnRouteChangeName/OnRouteChangeName'
import OnRouteSetting from './ProfileRoutes/OnRouteSetting/OnRouteSetting'

const PgProfileCombine = (props) => {

    const accItemsList = props.accItems.map((item => {
      return <Items top={item.top} bottom={item.bottom} key={item.bottom} />
    }))

    const proItemsList = props.proItems.map((item => {
      return <Items top={item.top} bottom={item.bottom} key={item.bottom}/>
    }))
    

    let accountRender = <> {accItemsList} </>

    if (props.profileRoutes.onEditAccount) {
      accountRender = <OnRouteEditAccount {...props} />

      if( props.profileRoutes.onChangePassword) {
        accountRender = <OnRouteChangePassword {...props} />
      }

      if( props.profileRoutes.onChangeName) {
        accountRender = <OnRouteChangeName {...props} />
      }

    }

    if (props.profileRoutes.onSetting) {
      accountRender =  <OnRouteSetting {...props} />
    }

    return (
        <>
          <div className={css.wrapper}>
            <div className={css.user}>
              <HIcon name='#user' type='lg'/>
            </div>
            <div className={css.account}>
                {accountRender}
                <div className={css.btnContainerLeft}>
                    <ProfileIcons 
                      name='#trash' 
                      text='Delete Account' 
                      clicked={
                      () => props.setPrompt(
                        true, 
                        'Are you sure you want to delete your account?',
                        'DELETE_ACCOUNT',
                        true
                        )} />
                    <ProfileIcons 
                      name='#edit' 
                      text='Edit Account' 
                      clicked={() => props.setOnEditAccount(true)}
                      />
                    <ProfileIcons 
                      name='#wrench' 
                      text='Settings'
                      clicked={() => props.setOnSetting(true)} />
                </div>
            </div>
            <div className={css.profile}>
              {proItemsList}
              <div className={css.btnContainerRight}>
                  <ProfileIcons 
                    name='#redo' 
                    text='Reset Profile' 
                    clicked={
                      () => props.setPrompt(
                        true, 
                        'Are you sure you want to reset your profile including posts?',
                        'RESET_PROFILE',
                        true
                        )
                    } />
              </div>
            </div>
          </div>
        </>
    )
}

export default PgProfileCombine
