import React from 'react'
import css from './PostCard.module.css'
import { Link, withRouter } from 'react-router-dom'

const PostCard = (props) => {
    return (
        <Link to={"/diary/post/" + props.id} className={css.post}>

            <h1 className={css.postTitle} dangerouslySetInnerHTML={{ __html: props.title }} />
            <p className={css.postContent} dangerouslySetInnerHTML={{ __html: props.content }} />
            
        </Link>
    )
}

export default withRouter(PostCard)
