import React from 'react';
import css from './PgCompose.module.css';
import { setTitleInput, setContentInput } from '../../../../../store/action/post_action';
import { connect } from 'react-redux';
import { clearPostInput, setReloadPost } from '../../../../../store/action/post_action';
import { setProgress, setIsShow, setError } from '../../../../../store/action/ui_action';
import * as btnFetch from '../ToolBar/btnFetch/btnFetch';
import { withRouter } from 'react-router-dom'

const PgCompose = (props) => {
    const onPostSubmit = (e) => {
        e.preventDefault();
        btnFetch.submitPost(props);
    }

    return (
        <div className={css.container}>
            <form className={css.form} onSubmit={onPostSubmit}>
                <label className={css.titleLabel} htmlFor='text'>Title :</label>
                    <input 
                        onChange={(e) => props.setTitleInput(e.target.value)}
                        value={props.title}
                        className={css.titleInput}
                        type="text" 
                        id="title" 
                        name='title'
                        maxLength="100"
                        autoComplete="off"/>
                <label className={css.contentLabel} htmlFor='text'>Content :</label>
                    <textarea 
                        onChange={(e) => props.setContentInput(e.target.value)}
                        value={props.content}
                        className={css.contentInput}
                        type="text"
                        id="content" 
                        name='content'
                        maxLength="2000"
                        autoComplete="off"/>   
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        title: state.composeInput.title,
        content: state.composeInput.content,
        email: state.userData.email
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTitleInput: (title) => dispatch(setTitleInput(title)),
        setContentInput: (content) => dispatch(setContentInput(content)),

        //this get called in btnFetch submitPost
        setProgress: (num) => dispatch(setProgress(num)),
        clearPostInput: () => dispatch(clearPostInput()),
        setReloadPost: (status) => dispatch(setReloadPost(status)),
        setIsShow: (status) => dispatch(setIsShow(status)),
        setError: (error, status) => dispatch(setError(error, status))
        ////
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PgCompose))
