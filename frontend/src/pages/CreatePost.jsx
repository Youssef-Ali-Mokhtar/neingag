import { useState } from 'react';
import CreatePostClasses from './create-post.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const CreatePost = () => {
    const [postInput, setPostInput] = useState({title:'', description:''});
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const handleInput = (event)=> {
        setPostInput(prev=>({
            ...prev, 
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmitInput = (event)=> {
        console.log(user.token);
        event.preventDefault();
        fetch('http://localhost:4000/api/posts', {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postInput)
        })
        .then(response=> {
            console.log(response);
            setPostInput({title:'', description:''});
            navigate('/');
        })
        .catch(err=>{
            console.log(err);
        })
        console.log("Heey!!");
    }

    console.log(postInput);
    return ( <div className={CreatePostClasses['create-post']}>
        <form 
            className={CreatePostClasses['input-container']}
            onSubmit={handleSubmitInput}
            >
            <h1 className={CreatePostClasses['create-post-title']}>Create Post</h1>
            <input 
                className={CreatePostClasses['input-title']}
                type='text'
                name='title'
                placeholder='Title'
                value={postInput.title}
                onChange={handleInput}
                required
                />
            <textarea
                className={CreatePostClasses['input-description']}
                type='text'
                name='description'
                placeholder='Speak your mind...'
                value={postInput.description}
                onChange={handleInput}
                required
            />
            <div className={CreatePostClasses['input-button-holder']}>
                <button className={CreatePostClasses['input-button']}>Post</button>
            </div>
        </form>
    </div> );
}
 
export default CreatePost;