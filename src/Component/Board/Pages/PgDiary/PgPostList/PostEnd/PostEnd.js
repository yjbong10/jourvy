import React from 'react'
import css from './PostEnd.module.css'

const PostEnd = (props) => {
    return (
        <div className={css.postEnd}>
            <p>{props.status}</p>
        </div>
    )
}

export default PostEnd
