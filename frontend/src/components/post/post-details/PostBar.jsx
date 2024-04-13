import PostBarClasses from './../post.module.css';

import DownvoteButton from './DownvoteButton';
import UpvoteButton from './UpvoteButton';
import { useState } from "react";

import BookmarkButton from './BookmarkButton';
import { useAuthContext } from '../../../hooks/useAuthContext';
import DeleteButton from './DeleteButton';
import CommentButton from './CommentButton';

const PostBar = ({ post, isPostDetails }) => {
    const { user } = useAuthContext();
    const [downvote, setDownvote] = useState(false);
    const [upvote, setUpvote] = useState(false);

    const [upvoteNum, setUpvoteNum] = useState(post.upvotes.length);
    const [downvoteNum, setDownvoteNum] = useState(post.downvotes.length);


    const postUserId = post?.userId?._id;
    const currentUserId = user?.userId;

    const isPostOwner = postUserId === currentUserId;

    function handleUpvote() {
        fetch(`http://localhost:4000/api/users/upvotes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user?.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: post._id
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(downvote) {
                handleDownvote();
            }

            setUpvoteNum(prev => {
                return upvote?prev-1:prev+1;
            });

            setUpvote(prev => !prev);

        })
        .catch(err => {
            console.log(err);
        });
        
    }
    console.log(user);
    function handleDownvote() {
        
        fetch(`http://localhost:4000/api/users/downvotes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user?.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: post._id
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(upvote) {
                handleUpvote();
            }

            setDownvoteNum(prev => {
                return downvote?prev-1:prev+1;
            });

            setDownvote(prev => !prev);
        })
        .catch(err => {
            console.log(err);
        });

    }

    return ( <div className={PostBarClasses['post-bar']}>
        <div className={PostBarClasses['post-bar-sub']}>
        { user &&
            <>
                <UpvoteButton
                    postId={post._id}
                    upvote={upvote}
                    setUpvote={setUpvote}
                    handleUpvote={handleUpvote}
                    upvoteNum={upvoteNum}
                    />
                <DownvoteButton
                    postId={post._id}
                    downvote={downvote}
                    setDownvote={setDownvote}
                    handleDownvote={handleDownvote}
                    downvoteNum={downvoteNum}
                    />
            </>
        }
            <CommentButton commentsNum={post.comments.length}/>
        </div>
        <div className={PostBarClasses['post-bar-sub']}>
            { user && <BookmarkButton postId={post._id}/> }
            { user && 
              isPostOwner &&
              isPostDetails &&
              <DeleteButton postId={post._id}/>
            }
        </div>
    </div> );
}

export default PostBar;