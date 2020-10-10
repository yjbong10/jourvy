//SUBMIT_USER_POST
export const submitPost = (props) => {
    props.setIsShow(false);
    props.setProgress(10);
    fetch('https://jourvy-server.herokuapp.com/diary/compose', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: props.email,
            title: props.title || '',
            content: props.content || ''
        })
    }).then(res => res.json())
        .then(data => {
            if (data.id) {
                props.setIsShow(true);
                props.setError('post has successfully posted!')
                props.setReloadPost();
                props.history.push('/diary')
                props.clearPostInput();
            } else {
                props.setIsShow(true);
                props.setError(data, 'warn')
            }
            props.setProgress(100);
        })
        .catch(err => {
            props.setIsShow(true);
            props.setError('something is wrong. :(', 'warn')
            props.setProgress(100);
        })

    props.setProgress(40);
}



//DELETE_POST_COMPOSE_INPUT
export const onClearPostInput = (props) => {
    props.setIsShow(false); 
    props.setProgress(40);
    // this is a workaround to make infocard rerender everytime it get called 
    setTimeout(() => {  
        props.clearPostInput();
        props.setIsShow(true);
        props.setError('Input Cleared')
        props.setProgress(100);
    }, 1);
}



//DELETE_POST_EDIT_INPUT
export const onClearEditInput = (props) => {
    props.setIsShow(false); 
    props.setProgress(40);
    // this is a workaround to make infocard rerender everytime it get called 
    setTimeout(() => {  
        props.clearEditInput();
        props.setIsShow(true);
        props.setError('Edit Cleared!', 'warn')
        props.setProgress(100);
    }, 1); 
}



//DELETE_USER_POST
export const onDeletePost = (props) => {
    const id = props.currentPost
    props.setIsShow(false); 
    props.setProgress(10);
    fetch('https://jourvy-server.herokuapp.com/diary/post/' + id, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: props.email
        })
    }).then(res => res.json())
        .then(data => {
            if (data.id) {
                props.setReloadPost();
                props.setIsShow(true);
                props.setError(data.message)
                props.clearCurrentPost()
                props.history.push('/diary')
            } else {
                props.setIsShow(true);
                props.setError(data, 'warn')
            }
            props.setProgress(100);
        })
        .catch(err => {
            props.setIsShow(true);
            props.setError('something is wrong :(', 'warn')
            props.setProgress(100);
        })
    props.setProgress(40);
}



//EDIT_USER_POST
export const editPost = (props) => {
    props.setIsShow(false);
    props.setProgress(10);
    const id = props.currentPost
    fetch('https://jourvy-server.herokuapp.com/diary/post/edit/' + id, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: props.email,
            title: props.editedTitle,
            content: props.editedContent
        })
    }).then(res => res.json())
        .then(data => {
            props.setProgress(60);
            if (data.id) {
                props.setIsShow(true);
                props.setError(`post id: ${id} is successfully edited!`)
                props.setReloadPost();
                props.history.push('/diary/post/' + id)
                props.clearEditInput();
            } else {
                props.setIsShow(true);
                props.setError(data, 'warn')
            }
        props.setProgress(100);
        })
        .catch(err => {
            props.setIsShow(true);
            props.setError('something is wrong. :(', 'warn')
            props.setProgress(100);
        })
    props.setProgress(40);
}
