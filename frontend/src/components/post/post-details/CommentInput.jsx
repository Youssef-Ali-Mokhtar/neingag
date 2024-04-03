import { useState } from "react";
import CommentsInputClasses from './../post.module.css';
import prof from './../../../assets/prof.png';
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

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

        fetch(`http://localhost:4000/api/posts/${id}/comments`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: comment })
        })
        .then(response=> {
            console.log(response);
            return response.json();
        })
        .then(data=> {
            console.log(data);
            refetch();
            setComment('');
        })
        .catch(err=> {
            console.log(err.message);
        })
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