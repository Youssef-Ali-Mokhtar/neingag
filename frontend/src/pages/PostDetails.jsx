import PostDetailsClasses from './post-details.module.css';
import useFetchPosts from '../hooks/useFetchPosts';
import { useParams } from 'react-router-dom';
import PostBar from '../components/post/post-details/PostBar';

const PostDetails = () => {
    
    const { id } = useParams();

    const {
        posts: post,
        error
    } = useFetchPosts(`http://localhost:4000/api/posts/${id}`);

    return ( <div className={PostDetailsClasses['post-details']}>
        {/* {
            loading && !error && <h1>Loading...</h1>
        } */}
        {
            post && !error &&
            <>
                <div className={PostDetailsClasses['post']}>
                    <h1 className={PostDetailsClasses['post-title']}>{post.title}</h1>
                    <p className={PostDetailsClasses['post-description']}>{post.description}</p>
                </div>
                <PostBar post={post}/>
            </>
        }
        {
            error && !post && <h1>{error}</h1>
        }
        
    </div> );
}

export default PostDetails;