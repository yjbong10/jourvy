import React from 'react'
import css from './PostDelimiter.module.css'

const PostDelimiter = (props) => {
    return (
        <div className={css.postDelimiter}>
            <p onClick={props.clicked} style={{cursor: 'pointer', width: 'max-content'}}>{`${props.month} ${props.year}`}</p>
        </div>
    )
}

export default PostDelimiter
