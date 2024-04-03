import { useState } from "react";
import CommentsInputClasses from './../post.module.css';
import prof from './../../../assets/prof.png';

const CommentInput = () => {
    const [comment, setComment] = useState('');

    const onChangeComment = (e)=> {
        setComment(e.target.value);
    }

    const handleCancel = ()=> {
        setComment('');
    }

    const handleSubmit = ()=> {
        console.log(comment);
        setComment('');
    }

    return ( <div className={ CommentsInputClasses['comment-input-container'] }>
        <img src={prof} alt="pic"/>
        <div className={ CommentsInputClasses['comment-input-form'] }>
            <textarea
                onChange={ onChangeComment }
                value={ comment }
                className={ CommentsInputClasses['comment-input'] }
            />
            <div className={ CommentsInputClasses['comment-input-buttons-holder'] }>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSubmit}>Post</button>
            </div>
        </div>
    </div> );
}
 
export default CommentInput;