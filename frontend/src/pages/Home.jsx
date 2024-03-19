import HomeClasses from './home.module.css';
import useFetchPosts from '../hooks/useFetchPosts';

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
            posts.map(post=>{
                return <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                </div>;
            })
        }
        {
            !loading && error && <h1>{error}</h1>
        }
    </div> );
}
 
export default Home;