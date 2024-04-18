import BookmarksClasses from './bookmarks.module.css';
import PostsList from '../components/post/PostsList';
import { useState, useEffect } from 'react';
import { useAuthContext } from './../hooks/useAuthContext';
import InfiniteScroll from 'react-infinite-scroll-component';

const Bookmarks = () => {
    const { user } = useAuthContext();
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/users/bookmarks?page=${page}`, {
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
            if(!data.length) {
                setHasMore(false);
            }
            if(page === 1){
                setPosts(data);
            } else {
                
                setPosts(prev=>[...prev, ...data]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }, [user, page])

    const handleLoadMore = () => {
      setPage(prevPage => prevPage + 1);
    };

    return ( <div className={BookmarksClasses['bookmarks']}>
            <InfiniteScroll
              dataLength={posts.length}
              next={handleLoadMore}
              hasMore={hasMore}
              endMessage={<p className={BookmarksClasses['no-more-posts']}>No more posts to load</p>}
              style={{overflow: 'hidden'}}
            >
              <PostsList posts={posts}/>
            </InfiniteScroll>
    </div> );
}
 
export default Bookmarks;