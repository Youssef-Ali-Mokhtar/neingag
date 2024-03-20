import HomeClasses from './home.module.css';
import useFetchPosts from '../hooks/useFetchPosts';
import PostsList from '../components/post/PostsList';

const Home = () => {
    const {
        posts, 
        error, 
        loading
    } = useFetchPosts();

    return ( <div className={HomeClasses['home']}>
        {
            loading && !error && <h1>Loading...</h1>
        }
        {
            !loading && !error && 
            <PostsList posts={posts}/>
        }
        {
            !loading && error && <h1>{error}</h1>
        }
    </div> );
}
 
export default Home;