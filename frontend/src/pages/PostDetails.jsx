import PostDetailsClasses from './post-details.module.css';
import useFetchPosts from '../hooks/useFetchPosts';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const {
        posts,
        loading,
        error
    } = useFetchPosts(id);

    return ( <div className={PostDetailsClasses['post-details']}>
        {
            loading && !error && <h1>Loading...</h1>
        }
        {
            !loading && !error && 
            <div className={PostDetailsClasses['post']}>
                <h1 className={PostDetailsClasses['post-title']}>{posts.title}</h1>
                <p className={PostDetailsClasses['post-description']}>{posts.description}</p>
            </div>
        }
        {
            !loading && error && <h1>{error}</h1>
        }
    </div> );
}

export default PostDetails;