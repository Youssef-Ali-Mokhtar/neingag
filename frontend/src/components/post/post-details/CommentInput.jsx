import { useState } from "react";
import CommentsInputClasses from './../post.module.css';
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { extractAvatar } from "../../../util/utilFunctions";

const CommentInput = ({ refetch }) => {
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const { user } = useAuthContext();

    const onChangeComment = (e)=> {
        setComment(e.target.value);
    }

    const handleCancel = ()=> {
        setComment('');
    }
    
    const handleSubmit = ()=> {
        if(!comment) return;

        fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}/comments`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: comment })
        })
        .then(response=> {
            return response.json();
        })
        .then(data=> {
            refetch();
            setComment('');
        })
        .catch(err=> {
            console.log(err.message);
        })
    }

    return ( <div className={ CommentsInputClasses['comment-input-container'] }>
        <img src={extractAvatar(user?.avatarNum)} alt="pic"/>
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