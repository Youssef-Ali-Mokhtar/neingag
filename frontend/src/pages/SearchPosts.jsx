import { useLocation } from 'react-router-dom';
import PostsList from '../components/post/PostsList';
import useFetchPosts from '../hooks/useFetchPosts';
import MyPostsClasses from './my-posts.module.css';

const SearchPosts = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get('query');
    const encodedQuery = encodeURIComponent(queryValue);
    console.log(encodedQuery);

    const { posts } = useFetchPosts(`http://localhost:4000/api/posts/search?query=${encodedQuery}`);

    return ( <div className={MyPostsClasses['my-posts']}>
        <PostsList posts={posts}/>
    </div> );
}

export default SearchPosts;