import { useParams } from 'react-router-dom';
import PostsList from '../components/post/PostsList';
import useFetchPosts from '../hooks/useFetchPosts';
import MyPostsClasses from './my-posts.module.css';

const MyPosts = () => {
    const { userId } = useParams();
    const {
        posts
    } = useFetchPosts(`http://localhost:4000/api/posts/${userId}/posts`);

    return ( <div className={MyPostsClasses['my-posts']}>
        <PostsList posts={posts}/>
    </div> );
}
 
export default MyPosts;