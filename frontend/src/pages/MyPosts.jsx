import { useParams } from 'react-router-dom';
import PostsList from '../components/post/PostsList';
import MyPostsClasses from './my-posts.module.css';
import { useAuthContext } from './../hooks/useAuthContext';
import { useState, useEffect } from 'react';

const MyPosts = () => {
    const { userId } = useParams();

    const { user } = useAuthContext();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:4000/api/posts/${userId}/posts`, {
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
            setPosts(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }, [userId, user])

    return ( <div className={MyPostsClasses['my-posts']}>
        <PostsList posts={posts}/>
    </div> );
}
 
export default MyPosts;