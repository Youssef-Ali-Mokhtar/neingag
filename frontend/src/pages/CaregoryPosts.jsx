import { useParams } from 'react-router-dom';
import PostsList from '../components/post/PostsList';
import MyPostsClasses from './my-posts.module.css';
import { useAuthContext } from './../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const CategoryPosts = () => {
    const { category } = useParams();

    const { user } = useAuthContext();
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(()=> {
      setPage(1);
      setHasMore(true);
    }, [category])

    useEffect(()=>{
        fetch(`http://localhost:4000/api/posts/interest/${category}?page=${page}`, {
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


  },[page, user, category])

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

    return ( <div className={MyPostsClasses['my-posts']}>
        {
            !loading && !error &&
            <InfiniteScroll
                dataLength={posts.length}
                next={handleLoadMore}
                hasMore={hasMore}
                endMessage={<p className={MyPostsClasses['no-more-posts']}>No more posts to load</p>}
                style={{overflow: 'hidden'}}
            >
                <PostsList posts={posts}/>
            </InfiniteScroll>
        }
    </div> );
}

export default CategoryPosts;