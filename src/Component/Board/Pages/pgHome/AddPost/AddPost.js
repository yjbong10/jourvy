import React from 'react'
import PromptBtn from '../../../../UI/PromptBtn/PromptBtn'
import css from './Addpost.module.css'

const AddPost = (props) => {

    function btnOnClick() {
        props.history.replace('/diary/compose')
    }

    return (
        <div className={css.container}>
            <h3>{props.greet} {props.name + '.'}</h3>
            <p><em>"Feels like to write something here. But I'm not sure what to write." - dev</em></p>
            <PromptBtn text="Add Post" type="cta" clicked={btnOnClick}/>
            {/* <button className={css.postBnt}>Add post</button> */}
        </div>
    )
}

export default AddPost
