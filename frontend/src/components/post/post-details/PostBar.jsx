import PostBarClasses from './post-bar.module.css';
import { BiUpvote } from "react-icons/bi";
// import { BiSolidUpvote } from "react-icons/bi";

// import { BiSolidDownvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

import { FaRegCommentAlt } from "react-icons/fa";

import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";

import { MdOutlineDeleteOutline } from "react-icons/md";


const PostBar = ({handleDelete, handleBookmark, bookmark}) => {

    const bookmarkCheckedIcon = (
        <FaBookmark 
            onClick={handleBookmark}
            size={20}
        />)

    const bookmarkUncheckedIcon = (
        <FaRegBookmark 
            onClick={handleBookmark}
            size={20}
        />)

    return ( <div className={PostBarClasses['post-bar']}>
        <div className={PostBarClasses['post-bar-sub']}>
            <BiUpvote size={24}/>
            <BiDownvote size={24}/>
            <FaRegCommentAlt size={20}/>
        </div>
        <div className={PostBarClasses['post-bar-sub']}>

            {bookmark?bookmarkCheckedIcon: bookmarkUncheckedIcon}

            <MdOutlineDeleteOutline
                onClick={handleDelete}
                size={27}
            />
        </div>
    </div> );
}

export default PostBar;