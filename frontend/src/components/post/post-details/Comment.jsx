import CommentClasses from './../post.module.css';
import { extractAvatar } from '../../../util/utilFunctions';

const Comment = ({userId, username, avatarNum, comment}) => {
    return ( <div className={CommentClasses['comment-container']}>
        <img src={extractAvatar(avatarNum)} alt="pic"/>
        <div className={CommentClasses['text-container']}>
            <p className={CommentClasses['username']}>{username}</p>
            <p className={CommentClasses['comment']}>{comment}</p>
        </div>
    </div> );
}
 
export default Comment;