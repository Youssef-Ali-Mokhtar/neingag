import HomeClasses from './home.module.css';
import PostsList from '../components/post/PostsList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import {useAuthContext} from './../hooks/useAuthContext';

const Home = () => {
    const {user} = useAuthContext();
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/posts?page=${page}`, {
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
            setLoading(false);

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
            setLoading(false);
            setError(err.message);
          });
    },[page, user?.token])

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
      };

    return ( <div className={HomeClasses['home']}>

        {
            !loading && !error &&
            <InfiniteScroll
                dataLength={posts.length}
                next={handleLoadMore}
                hasMore={hasMore}
                endMessage={<p className={HomeClasses['no-more-posts']}>No more posts to load</p>}
                style={{overflow: 'hidden'}}
            >
                <PostsList posts={posts}/>
            </InfiniteScroll>
        }

    </div> );
}
 
export default Home;