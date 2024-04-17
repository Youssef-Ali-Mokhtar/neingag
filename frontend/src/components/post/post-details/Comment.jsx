import CommentClasses from './../post.module.css';
import { extractAvatar } from '../../../util/utilFunctions';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../util/utilFunctions';
import DeleteButton from './DeleteButton';
import { useAuthContext } from './../../../hooks/useAuthContext';

const Comment = ({comment, refetch}) => {
    const { user } = useAuthContext();
    const isAuthorized = user?.userId === comment.userId._id;

    return ( <div id = {comment._id} className={CommentClasses['comment-container']}>
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
        {
            isAuthorized &&
            <DeleteButton 
                commentId={comment._id} 
                refetch={refetch} />
        }
        
    </div> );
}
 
export default Comment;