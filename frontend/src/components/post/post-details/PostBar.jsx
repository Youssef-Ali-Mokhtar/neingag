import PostBarClasses from './post-bar.module.css';
import { BiUpvote } from "react-icons/bi";
// import { BiSolidUpvote } from "react-icons/bi";

// import { BiSolidDownvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";

import BookmarkButton from './BookmarkButton';
import { useAuthContext } from '../../../hooks/useAuthContext';
import DeleteButton from './DeleteButton';

const PostBar = ({ post }) => {
    const { user } = useAuthContext();
    
    const postUserId = post?.userId?._id;
    const currentUserId = user?.userId;

    const isPostOwner = postUserId === currentUserId;

    console.log("POST BAR: ", isPostOwner);
    return ( <div className={PostBarClasses['post-bar']}>
        <div className={PostBarClasses['post-bar-sub']}>
            <BiUpvote size={24}/>
            <BiDownvote size={24}/>
            <FaRegCommentAlt size={20}/>
        </div>
        <div className={PostBarClasses['post-bar-sub']}>
            { user && <BookmarkButton/> }
            { user && isPostOwner && <DeleteButton/> }
        </div>
    </div> );
}

export default PostBar;