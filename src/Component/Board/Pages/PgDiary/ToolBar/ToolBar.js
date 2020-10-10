import React, { useEffect } from 'react'
import css from './ToolBar.module.css'
import sprite from '../../../../../assets/sprite.svg';
import { connect } from 'react-redux';
import { setReloadPost, sortUserPosts } from '../../../../../store/action/post_action';
import { clearCurrentPost, clearEditInput, clearPostInput } from '../../../../../store/action/post_action';
import { setProgress, setIsShow, setError, setPrompt, setPromptIsConfirm } from '../../../../../store/action/ui_action';
import * as btnFetch from './btnFetch/btnFetch';

const ToolBar = (props) => {

    const id = props.currentPost;

    function sort(method) {
        props.sortUserPosts(method)
    }

    function list() {
        props.history.push('/diary') 
    }

    function read() {
        if (!id) {
            return; 
        } 
        props.history.push('/diary/post/' + id)
    }

    function write() {
        props.history.push('/diary/compose') 
    }

    const isRead = (props.currentPg === props.match.url + '/post/' + id);
    const isList = (props.currentPg === props.match.url);
    const isWrite = (props.currentPg === props.match.url + '/compose') || 
    (props.currentPg === props.match.url + '/post/edit/' + id);

    let showOnListId = [css.toolbar_icon, css.disable].join(' ')
    let showOnList = [css.toolbar_icon, css.disable].join(' ')
    let showOnWrite = [css.toolbar_icon, css.disable].join(' ')
    let showOnWriteRead = [css.toolbar_icon, css.disable].join(' ')

    switch(true){
        case isRead:
            showOnListId = [css.toolbar_icon] 
            showOnWriteRead = [css.toolbar_icon] 
            break;
        case isList:
            if(id){
                showOnListId = [css.toolbar_icon]
            } 
            showOnList = [css.toolbar_icon]
            break;
        case isWrite:
            if(id){
                showOnListId = [css.toolbar_icon]
            } 
            showOnWrite = [css.toolbar_icon]
            showOnWriteRead = [css.toolbar_icon]
            break;
        default:
            break;
    }

    if (props.post.length === 0) {showOnList = [css.toolbar_icon, css.disable].join(' ')}



    const onPostSubmit = () => {
        if (props.currentPg === props.match.url + '/post/edit/' + id){
            btnFetch.editPost(props)
        } else {
            btnFetch.submitPost(props);
        }
    }

    const onPostDelete = () => {

        if(props.currentPg === "/diary/compose"){
            btnFetch.onClearPostInput(props)

        } else if (props.currentPg === "/diary/post/edit/" + id) {
            props.setPrompt(true, 'Are you sure you want to clear all of this?', 'CLEAR_EDIT_INPUT', false)

        } else {
            props.setPrompt(true, 'Are you sure you want to delete this post?', 'DELETE_USER_POST', false)
        }
    }

    useEffect(() => {

        if(props.isPromptConfirm && props.promptName === 'DELETE_USER_POST'){
            btnFetch.onDeletePost(props)
            props.setPromptIsConfirm(false, 'clear')
            
        } else if (props.isPromptConfirm && props.promptName === 'CLEAR_EDIT_INPUT') {
            btnFetch.onClearEditInput(props)
            props.setPromptIsConfirm(false, 'clear')
        }

        // eslint-disable-next-line
    }, [props.isPromptConfirm, props.promptName])



    return (
        <div className={css.toolbar}>
            <div className={css.item1}>
                <svg className={showOnList} onClick={() => sort('desc')}>
                    <use href={sprite + '#sort-amount-up-alt'}/>
                </svg>
                <svg className={showOnList} onClick={() => sort('asc')}>
                    <use href={sprite + '#sort-amount-down-alt'}/>
                </svg>
            </div>
            <div className={css.item2}>
                <svg className={css.toolbar_icon} onClick={list}>
                    <use href={sprite + '#list'} />
                </svg>
                <svg className={showOnListId} onClick={read}>
                    <use href={sprite + '#book'}/>
                </svg>
                <svg className={css.toolbar_icon} onClick={write}>
                    <use href={sprite + '#edit'} />
                </svg>
            </div>
            <div className={css.item3}>
                <svg className={showOnWrite} onClick={onPostSubmit}>
                    <use href={sprite + '#save'}/>
                </svg>
                <svg className={showOnWriteRead} onClick={onPostDelete}>
                    <use href={sprite + '#trash'}/>
                </svg>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentPost : state.currentPost.currentPost,
        title: state.composeInput.title,
        content: state.composeInput.content,
        editedTitle: state.editInput.title,
        editedContent: state.editInput.content,
        email: state.userData.email,
        post: state.userPosts,
        isPromptConfirm: state.prompt.isConfirm,
        promptName : state.prompt.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sortUserPosts: (method) => dispatch(sortUserPosts(method)),
        //this get called in btnFetch submitPost
        setProgress: (num) => dispatch(setProgress(num)),
        clearPostInput: () => dispatch(clearPostInput()),
        clearEditInput: () => dispatch(clearEditInput()),
        setReloadPost: (status) => dispatch(setReloadPost(status)),
        clearCurrentPost: () => dispatch(clearCurrentPost()),
        setPromptIsConfirm: (status, name) => dispatch(setPromptIsConfirm(status, name)),
        ////
        setIsShow: (status) => dispatch(setIsShow(status)),
        setError: (error, status) => dispatch(setError(error, status)),
        setPrompt: (status, message, name, needVerify) => dispatch(setPrompt(status, message, name, needVerify))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
