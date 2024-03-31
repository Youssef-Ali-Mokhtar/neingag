import BookmarksClasses from './bookmarks.module.css';
import useFetchPosts from '../hooks/useFetchPosts';
import PostsList from '../components/post/PostsList';

const Bookmarks = () => {
    const {
        posts
    } = useFetchPosts(`http://localhost:4000/api/users/bookmarks`);
    
    return ( <div className={BookmarksClasses['bookmarks']}>
        <PostsList posts={posts}/>
    </div> );
}
 
export default Bookmarks;