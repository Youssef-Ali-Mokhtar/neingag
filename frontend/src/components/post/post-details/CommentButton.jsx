import { FaRegCommentAlt } from "react-icons/fa";
import CommentButtonClasses from './../post.module.css';
import { Link } from 'react-router-dom';

const CommentButton = ({commentsNum, postId}) => {
    return ( <Link to={`/post/${postId}`} className={CommentButtonClasses['vote-button']}>
        <FaRegCommentAlt size={20}/>
        <p>{commentsNum}</p>
    </Link> );
}
 
export default CommentButton;