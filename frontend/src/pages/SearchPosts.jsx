import { useLocation } from 'react-router-dom';
import PostsList from '../components/post/PostsList';
import MyPostsClasses from './my-posts.module.css';
import { useAuthContext } from './../hooks/useAuthContext';
import { useState, useEffect } from 'react';

const SearchPosts = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get('query');
    const encodedQuery = encodeURIComponent(queryValue);

    const { user } = useAuthContext();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/search?query=${encodedQuery}`, {
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
    }, [user, encodedQuery])

    return ( <div className={MyPostsClasses['my-posts']}>
        <PostsList posts={posts}/>
    </div> );
}

export default SearchPosts;