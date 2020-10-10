import React, { useEffect } from 'react';
import css from './PgEdit.module.css';
import { editTitleInput, editContentInput, clearEditInput } from '../../../../../store/action/post_action';
import { connect } from 'react-redux';
import { clearPostInput, setReloadPost } from '../../../../../store/action/post_action';
import { setProgress } from '../../../../../store/action/ui_action';
import * as btnFetch from '../ToolBar/btnFetch/btnFetch';
import { withRouter } from 'react-router-dom'
import { setIsShow, setError } from '../../../../../store/action/ui_action';

const PgEdit = (props) => {
    const currrentPost = props.posts.find(item => {return item.id === props.currentPost}) 


    // this is a workaround to make infocard rerender everytime it get called 
    useEffect(() => {
        props.setIsShow(false)
        setTimeout(() => {
            props.setError('You Are On Editing Page', 'warn')
            props.setIsShow(true)
        }, 1);
        return() => {
            props.setIsShow(false)
            setTimeout(() => {
                props.setError('You Are Leaving Editing Page')
                props.setIsShow(true)
            }, 1);
        }
        // eslint-disable-next-line
    }, [])


    //set post title and content to editInputState so that it can show on input value
    useEffect(() => {
        props.editTitleInput(currrentPost.title)
        props.editContentInput(currrentPost.content)
        // eslint-disable-next-line
    }, [])


    const onPostEdit = (e) => {
        e.preventDefault();
        btnFetch.editPost(props);
    }

    
    return (
        <div className={css.container}>
            <form className={css.form} onSubmit={onPostEdit}>
                <label className={css.titleLabel} htmlFor='text'>Title :</label>
                    <input 
                        onChange={(e) => props.editTitleInput(e.target.value)}
                        value={props.editedTitle}
                        className={css.titleInput}
                        type="text" 
                        id="title" 
                        name='title'
                        maxLength="100"
                        autoComplete="off"/>
                <label className={css.contentLabel} htmlFor='text'>Content :</label>
                    <textarea 
                        onChange={(e) => props.editContentInput(e.target.value)}
                        value={props.editedContent}
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
        editedTitle: state.editInput.title,
        editedContent: state.editInput.content,
        email: state.userData.email,

        posts : state.userPosts, // to find post that has the same id with params
        currentPost : state.currentPost.currentPost // to set post id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTitleInput: (title) => dispatch(editTitleInput(title)),
        editContentInput: (content) => dispatch(editContentInput(content)),

        //this get called in btnFetch submitPost
        setProgress: (num) => dispatch(setProgress(num)),
        clearPostInput: () => dispatch(clearPostInput()),
        clearEditInput: () => dispatch(clearEditInput()),
        setReloadPost: (status) => dispatch(setReloadPost(status)),
        ////
        setIsShow: (status) => dispatch(setIsShow(status)),
        setError: (error, status) => dispatch(setError(error, status))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PgEdit))
