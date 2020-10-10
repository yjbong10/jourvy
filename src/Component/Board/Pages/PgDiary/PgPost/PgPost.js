import React, { useEffect } from 'react';
import css from './PgPost.module.css';
import { withRouter } from 'react-router-dom';
import { setCurrentPost } from '../../../../../store/action/post_action';
import { connect } from 'react-redux';
import sprite from '../../../../../assets/sprite.svg';

const PgPost = (props) => {

    const id = Number(props.match.params.id); // props.match.params.id was string
    const posts = props.posts.find(item => {return item.id === id}) //item.id is number so id must converted to number
    const {setCurrentPost} = props //destruturing setCurrrentPost from props to prevent rerender in useEffect
    useEffect(() => {
        setCurrentPost(id) // save post id so that ReadPage remember what post user was on
    }, [setCurrentPost, id]) //only execute when id and setCurrentPost is changed
   
    let postRender = <h1>404: post not exist</h1>


    const postedDate = posts.postedFmt.slice(0, 10).replace(/[/]/g, '-').replace(/[,]/g, '')
    const postedTime = posts.postedFmt.slice(11, 22)

    let renderEditedDate;
    if(posts.edited){
        const editedDate = posts.editedFmt.slice(0, 9).replace(/[/]/g, '-').replace(/[,]/g, '')
        const editedTime = posts.editedFmt.slice(11, 22)
        renderEditedDate = <p className={css.posted}> Edited on: <em>{editedDate}  {editedTime}</em></p>
    }


    function OnEdit() {
        props.history.replace('/diary/post/edit/'+ id)
    }

    if (posts) {
        postRender =  <>
                        <div>
                            <svg className={css.post_edit_icon} onClick={OnEdit}>
                                <use href={sprite + '#edit'} />
                            </svg>
                            <h1 className={css.title}>{posts.title}</h1>
                            <p className={css.posted}>
                                Posted on: <em>{postedDate}  {postedTime}</em>
                            </p>
                            {renderEditedDate}
                        </div>
                        <p className={css.content}>{posts.content}</p>
                    </>
    }
    return (
        <div className={css.container}>
            {postRender}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts : state.userPosts, // to find post that has the same id with params
        currentPost : state.currentPost // to set post id
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPost: (id) => dispatch(setCurrentPost(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PgPost))
