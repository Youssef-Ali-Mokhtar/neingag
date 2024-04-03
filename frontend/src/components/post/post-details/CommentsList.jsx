import CommentsListClasses from './../post.module.css';
import Comment from './Comment';
const CommentsList = ({comments}) => {
    return ( <div className={CommentsListClasses['comments-list']}>
        {
            comments.map(comment=> (
                <Comment
                    key={comment.userId}
                    username={comment.username}
                    avatarNum={comment.avatarNum}
                    comment={comment.comment}
                />
            ))
        }
    </div> );
}

export default CommentsList;