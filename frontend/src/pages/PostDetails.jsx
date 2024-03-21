import PostDetailsClasses from './post-details.module.css';
import useFetchPosts from '../hooks/useFetchPosts';
import { useParams } from 'react-router-dom';
import PostBar from '../components/post/post-details/PostBar';
import { useNavigate } from 'react-router-dom';

const PostDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        posts,
        error
    } = useFetchPosts(id);

    const handleDelete = ()=>{
        fetch(`http://localhost:4000/api/posts/${id}`, {
            method:'DELETE',
        })
        .then(response=> {
            console.log(response);
            navigate('/');
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return ( <div className={PostDetailsClasses['post-details']}>
        {/* {
            loading && !error && <h1>Loading...</h1>
        } */}
        {
            posts && !error &&
            <>
                <div className={PostDetailsClasses['post']}>
                    <h1 className={PostDetailsClasses['post-title']}>{posts.title}</h1>
                    <p className={PostDetailsClasses['post-description']}>{posts.description}</p>
                </div>
                <PostBar handleDelete={handleDelete}/>
            </>
        }
        {
            error && !posts && <h1>{error}</h1>
        }
        
    </div> );
}

export default PostDetails;