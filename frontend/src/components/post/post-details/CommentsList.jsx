import CommentsListClasses from './../post.module.css';
import Comment from './Comment';

const CommentsList = ({comments}) => {

    return ( <div className={CommentsListClasses['comments-list']}>
        {   comments &&
            comments.map(comment=> (
                <Comment
                    key={comment._id}
                    comment={comment}
                />
            ))

        }
    </div> );
}

export default CommentsList;