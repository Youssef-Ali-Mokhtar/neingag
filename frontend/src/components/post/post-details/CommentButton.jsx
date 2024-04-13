import { FaRegCommentAlt } from "react-icons/fa";
import CommentButtonClasses from './../post.module.css';

const CommentButton = ({commentsNum}) => {
    return ( <div className={CommentButtonClasses['vote-button']}>
        <FaRegCommentAlt size={20}/>
        <p>{commentsNum}</p>
    </div> );
}
 
export default CommentButton;