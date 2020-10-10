import React, { useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import css from './PgDiary.module.css';
import ToolBar from './ToolBar/ToolBar';
import PgPostList from './PgPostList/PgPostList';
import PgPost from './PgPost/PgPost';
import PgCompose from './PgCompose/PgCompose';
import PgEdit from './PgEdit/PgEdit';
import { setUserPosts, clearSearchInput } from '../../../../store/action/post_action';
import { setProgress, setIsLoad } from '../../../../store/action/ui_action';


const PgDiary = (props) => {
  const {reloadPost} = props

  useEffect(() => {
    props.setIsLoad(true)
    props.setProgress(10)
    fetch('https://jourvy-server.herokuapp.com/diary', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          email: props.email,
      })
  }).then(res => res.json())
      .then(data => {
        if (data[0].id) {
          if(data[0].length !== props.posts.length) {
            console.log('data updated')
            props.setUserPosts(data)
          }
          console.log('data no updated')
        } else {
          props.setUserPosts([])
          console.log(data)
        }
        props.setProgress(100)
        props.setIsLoad(false)
      })
      .catch(err => {
        props.setProgress(100)
        props.setIsLoad(false)
        console.log(err)
      })
    props.setProgress(50)
      // eslint-disable-next-line
  }, [reloadPost])

  //this is to clear searchInput when this component dismount
  useEffect(() => {
    return () => {
     props.clearSearchInput()
    }
    // eslint-disable-next-line
  }, [])

  const currentPg = props.location.pathname; //check current url, to conditionaly render child component
  return (
    <div className={css.container}> 
      <ToolBar {...props} currentPg={currentPg} /> 
      <Switch>
        <Route path='/diary' exact component={() => <PgPostList {...props} />}/>
        <Route path='/diary/post/:id' exact component={PgPost}/> {/*PgPost not getting props from here as it will mapStateToProps on its own*/}
        <Route path='/diary/compose' exact component={() => <PgCompose />}/>
        <Route path='/diary/post/edit/:id' exact component={PgEdit}/>  
        <Redirect from='/diary/:path' to='/'/>
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    posts : state.userPosts, // to pass the props into PgPostList and ToolBar component except PgPost
    email: state.userData.email,
    reloadPost: state.reloadPost,
    isLoad: state.isLoad,
    searchInput: state.searchInput
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserPosts: (posts) => dispatch(setUserPosts(posts)),
    setProgress: (num) => dispatch(setProgress(num)),
    setIsLoad: (status) => dispatch(setIsLoad(status)),
    clearSearchInput: () => dispatch(clearSearchInput())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PgDiary))
