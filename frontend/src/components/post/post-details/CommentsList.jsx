import CommentsListClasses from './../post.module.css';
import Comment from './Comment';

const CommentsList = ({comments, refetch}) => {

    return ( <div className={CommentsListClasses['comments-list']}>
        {   comments &&
            comments.map(comment=> (
                <Comment
                    key={comment._id}
                    comment={comment}
                    refetch={refetch}
                />
            ))

        }
    </div> );
}

export default CommentsList;