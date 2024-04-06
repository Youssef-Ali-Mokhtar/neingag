import BookmarksClasses from './bookmarks.module.css';
import PostsList from '../components/post/PostsList';
import { useState, useEffect } from 'react';
import { useAuthContext } from './../hooks/useAuthContext';

const Bookmarks = () => {
    const { user } = useAuthContext();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:4000/api/users/bookmarks`, {
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
    }, [user])

    return ( <div className={BookmarksClasses['bookmarks']}>
            <PostsList posts={posts}/>
    </div> );
}
 
export default Bookmarks;