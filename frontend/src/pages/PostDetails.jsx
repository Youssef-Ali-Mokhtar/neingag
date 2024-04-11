import PostDetailsClasses from './post-details.module.css';
import { useParams } from 'react-router-dom';
import PostBar from '../components/post/post-details/PostBar';
import PostHeader from '../components/post/post-details/PostHeader';
import CommentsList from '../components/post/post-details/CommentsList';
import CommentInput from '../components/post/post-details/CommentInput';
import { useAuthContext } from './../hooks/useAuthContext';
import { useState, useEffect, useCallback } from 'react';

const PostDetails = () => {
    const { id } = useParams();

    const { user } = useAuthContext();
    const [post, setPost] = useState(null);
    console.log(post);
    const fetchData = useCallback(()=> {
        fetch(`http://localhost:4000/api/posts/${id}`, {
            headers: {
              'authorization': `Bearer ${user?.token}`
            }
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch posts');
            }
            return response.json();
          })
          .then((data) => {
            setPost(data);
          })
          .catch((err) => {
            console.log(err);
          });
    },[user, id]);

    useEffect(()=> {
        fetchData();
    }, [fetchData])

    const refetch = ()=>{
        fetchData();
    }
    console.log(post);

    return ( <div className={PostDetailsClasses['post-details']}>
        {
            post &&
            <>
                <PostHeader category='Humor' post={post}/>
                <div className={PostDetailsClasses['post']}>
                    <h1 className={PostDetailsClasses['post-title']}>{post.title}</h1>
                    <p className={PostDetailsClasses['post-description']}>{post.description}</p>
                </div>
                <PostBar post={post}/>
                {user && <CommentInput refetch={refetch}/>}
                <CommentsList 
                  comments={post?.comments}
                  refetch={refetch}/>
            </>
        }
        
    </div> );
}

export default PostDetails;