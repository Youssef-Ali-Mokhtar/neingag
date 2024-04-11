import PostBarClasses from './../post.module.css';
import { BiUpvote } from "react-icons/bi";

import { BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";

import DownvoteButton from './DownvoteButton';
import UpvoteButton from './UpvoteButton';
import { useState } from "react";

import BookmarkButton from './BookmarkButton';
import { useAuthContext } from '../../../hooks/useAuthContext';
import DeleteButton from './DeleteButton';

const PostBar = ({ post }) => {
    const { user } = useAuthContext();
    const [downvote, setDownvote] = useState(false);
    const [upvote, setUpvote] = useState(false);
    const postUserId = post?.userId?._id;
    const currentUserId = user?.userId;

    const isPostOwner = postUserId === currentUserId;

    function handleUpvote() {
        // fetch(`http://localhost:4000/api/users/upvotes`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${user?.token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         postId: id
        //     })
        // })
        // .then(response => {
        //     return response.json();
        // })
        // .then(data=>{
        //     setUpvote(prev=>!prev);
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        if(downvote) {
            handleDownvote();
        }
        setUpvote(prev=>!prev);
        

    }

    function handleDownvote() {
        
        // fetch(`http://localhost:4000/api/users/downvotes`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${user?.token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         postId: id
        //     })
        // })
        // .then(response => {
        //     return response.json();
        // })
        // .then(data=>{
        //     setDownvote(prev=>!prev);
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        if(upvote) {
            handleUpvote();
        }
        setDownvote(prev=>!prev);
    }

    return ( <div className={PostBarClasses['post-bar']}>
        <div className={PostBarClasses['post-bar-sub']}>
            <UpvoteButton 
                postId={post._id}
                upvote={upvote}
                handleUpvote={handleUpvote}
                />
            <DownvoteButton 
                postId={post._id}
                downvote={downvote}
                handleDownvote={handleDownvote}
                />
            <FaRegCommentAlt size={20}/>
            <p>{post.comments.length}</p>
        </div>
        <div className={PostBarClasses['post-bar-sub']}>
            { user && <BookmarkButton postId={post._id}/> }
            { user && isPostOwner && <DeleteButton/> }
        </div>
    </div> );
}

export default PostBar;