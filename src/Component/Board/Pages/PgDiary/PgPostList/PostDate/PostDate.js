import React from 'react'
import css from './PostDate.module.css'

const PostDate = (props) => {
    return (
        <div className={css.postDate}>
            <h2 className={css.postDay}>
                {props.day}
            </h2> 
            <p className={css.postMonth}>
                {props.month}
            </p>
        </div>
    )
}

export default PostDate
