import PostDetailsClasses from './post-details.module.css';
import useFetchPosts from '../hooks/useFetchPosts';
import { useParams } from 'react-router-dom';
import PostBar from '../components/post/post-details/PostBar';
import PostHeader from '../components/post/post-details/PostHeader';
import CommentsList from '../components/post/post-details/CommentsList';
import CommentInput from '../components/post/post-details/CommentInput';

const PostDetails = () => {
    const { id } = useParams();
    const {
        posts: post,
        refetch,
        error
    } = useFetchPosts(`http://localhost:4000/api/posts/${id}`);

    return ( <div className={PostDetailsClasses['post-details']}>
        {
            post && !error &&
            <>
                <PostHeader category='Humor' post={post}/>
                <div className={PostDetailsClasses['post']}>
                    <h1 className={PostDetailsClasses['post-title']}>{post.title}</h1>
                    <p className={PostDetailsClasses['post-description']}>{post.description}</p>
                </div>
                <PostBar post={post}/>
                <CommentInput refetch={refetch}/>
                <CommentsList comments={post?.comments}/>
            </>
        }
        {
            error && !post && <h1>{error}</h1>
        }
        
    </div> );
}

export default PostDetails;