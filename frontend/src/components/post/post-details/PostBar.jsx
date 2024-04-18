import PostBarClasses from './../post.module.css';
import BookmarkButton from './BookmarkButton';
import DownvoteButton from './DownvoteButton';
import UpvoteButton from './UpvoteButton';
import DeleteButton from './DeleteButton';
import CommentButton from './CommentButton';
import { useState, useEffect } from "react";
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useParams } from "react-router-dom";

const PostBar = ({ post, isPostDetails }) => {
    const { user } = useAuthContext();
    const [downvote, setDownvote] = useState(false);
    const [upvote, setUpvote] = useState(false);

    const [upvoteNum, setUpvoteNum] = useState(post.upvotes.length);
    const [downvoteNum, setDownvoteNum] = useState(post.downvotes.length);

    const id = useParams().id || post?._id;

    const postUserId = post?.userId?._id;
    const currentUserId = user?.userId;

    const isPostOwner = postUserId === currentUserId;


    useEffect(() => {
        const setDownvoteInitialState = () => {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/downvotes/${id}`, {
                headers: {
                    'Authorization':`Bearer ${user?.token}`
                }
            })
            .then(response => {
                return response.json();
            })
            .then(isDownvoted => {
                setDownvote(isDownvoted);
            })
            .catch(err=> {
                console.log(err);
            })
        }

        if(user) {
            setDownvoteInitialState();
        }

    }, [id, user]);

    function handleSetUpvote() {
        setUpvoteNum(prev => {
            return upvote?prev-1:prev+1;
        });
        setUpvote(prev => !prev);

        if(downvote) {
            setDownvote(prev => !prev);
            setDownvoteNum(prev => prev-1);
        }
    }
    
    useEffect(()=>{
        const setUpvoteInitialState = () => {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/upvotes/${id}`, {
                headers: {
                    'Authorization':`Bearer ${user?.token}`
                }
            })
            .then(response=> {
                return response.json();
            })
            .then(isUpvoted=> {
                setUpvote(isUpvoted);
            })
            .catch(err=> {
                console.log(err);
            })
        }
        if(user) {
            setUpvoteInitialState();
        }
        
    }, [id, user]);

    function handleSetDownvote() {
        setDownvoteNum(prev => {
            return downvote?prev-1:prev+1;
        });
        setDownvote(prev => !prev);

        if(upvote) {
            setUpvote(prev => !prev);
            setUpvoteNum(prev => prev-1);
        }
    }

    function postUpvote() {
        fetch(`${process.env.REACT_APP_API_URL}/api/users/upvotes`, {
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
                postDownvote();
            }
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    function postDownvote() {
        
        fetch(`${process.env.REACT_APP_API_URL}/api/users/downvotes`, {
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
                postUpvote();
            }
        })
        .catch(err => {
            console.log(err);
        });

    }

    function handleUpvote() {
        if(!user) return;
        handleSetUpvote();
        postUpvote();
        
    }

    function handleDownvote() {
        if(!user) return;
        handleSetDownvote();
        postDownvote();
    }

    return ( <div className={PostBarClasses['post-bar']}>
        <div className={PostBarClasses['post-bar-sub']}>
        {
            user &&
            <>
                <UpvoteButton
                    postId={post._id}
                    upvote={upvote}
                    handleUpvote={handleUpvote}
                    upvoteNum={upvoteNum}
                />
                <DownvoteButton
                    postId={post._id}
                    downvote={downvote}
                    handleDownvote={handleDownvote}
                    downvoteNum={downvoteNum}
                />
            </>
        }


        <CommentButton commentsNum={post.comments.length} postId={post._id}/>
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