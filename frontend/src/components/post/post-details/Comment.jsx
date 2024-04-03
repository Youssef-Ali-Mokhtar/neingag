import CommentClasses from './../post.module.css';
import { extractAvatar } from '../../../util/utilFunctions';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../util/utilFunctions';

const Comment = ({comment}) => {
    return ( <div className={CommentClasses['comment-container']}>
        <Link to={`/profile/${comment.userId._id}`}>
            <img src={extractAvatar(comment.userId.avatarNum)} alt="pic"/>
        </Link>
        <div className={CommentClasses['text-container']}>
            <Link to={`/profile/${comment.userId._id}`} className={CommentClasses['username']}>
                {comment.userId.username} 
                <span>{formatDate(comment.createdAt)}</span>
            </Link>
            <p className={CommentClasses['comment']}>{comment.comment}</p>
        </div>
    </div> );
}
 
export default Comment;