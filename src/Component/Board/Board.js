import React from 'react';
import css from './Board.module.css'
import PgHome from './Pages/pgHome/PgHome';
import PgToF from './Pages/PgToF/PgToF';
import PgProfile from './Pages/PgProfile/PgProfile';
import PgAbout from './Pages/PgAbout/PgAbout';
import PgDiary from './Pages/PgDiary/PgDiary';
import Overlay from '../UI/Overlay/Overlay';
import LogOut from './Pages/LogOut/LogOut';
import { Route, Switch } from 'react-router-dom';
import InfoCard from '../UI/InfoCard/InfoCard';
import Prompt from '../UI/Prompt/Prompt';

const Board = (props) => {

  function overlayOnclick() {
    props.setIsSidebarShow(false)
    props.setPrompt(false)
    props.clearAuthInput()
  }

  function promptOnConfirm() {
    props.setPromptIsConfirm(true)
    props.setPrompt(false)
  }

  function promptOnCancel() {
    props.setPrompt(false)
    props.clearAuthInput()
  }

  return (
    <div className={css.board}>
      {(props.isSideBarShow || props.prompt.isPromptShow) && <Overlay clicked={overlayOnclick} />}
      {props.prompt.isPromptShow && 
        <Prompt 
          {...props}
          onCancel={promptOnCancel}
          onConfirm={promptOnConfirm}
        />}
      {props.isShow && <InfoCard msg={props.error} />}
      <Switch>
        <Route path="/" exact component={PgHome}/>
        <Route path="/terms-of-use" exact component={PgToF}/>
        <Route path="/profile" exact component={PgProfile}/>
        <Route path="/about" exact component={PgAbout}/>
        <Route path="/diary" component={PgDiary}/>
        <Route path="/logout" component={LogOut}/>
        <Route component={PgHome} />
      </Switch>
    </div>
  );
}

export default Board;

