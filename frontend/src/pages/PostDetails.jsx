import PostDetailsClasses from './post-details.module.css';
import useFetchPosts from '../hooks/useFetchPosts';
import { useParams } from 'react-router-dom';
import PostBar from '../components/post/post-details/PostBar';
import PostHeader from '../components/post/post-details/PostHeader';
import CommentsList from '../components/post/post-details/CommentsList';
import CommentInput from '../components/post/post-details/CommentInput';

const comments = [
    {
        userId:'1_blabla',
        username:'goodnews',
        avatarNum:4,
        comment:"This is the first commment, I hope you enjoy what I'm gonna say tonight because it will be a blast and not the Muslim way if you know what I mean, loco loco mofos, you hear me? yeahh keep moving"
    },
    {
        userId:'2_blabla',
        username:'omarpotato',
        avatarNum:1,
        comment:"Not the first comment but well..."
    },
    {
        userId:'3_blabla',
        username:'Elduderino',
        avatarNum:7,
        comment:"I'm the wisest Canadian that has ever lived"
    }
];

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
                <PostHeader category='Humor' post={post}/>
                <div className={PostDetailsClasses['post']}>
                    <h1 className={PostDetailsClasses['post-title']}>{post.title}</h1>
                    <p className={PostDetailsClasses['post-description']}>{post.description}</p>
                </div>
                <PostBar post={post}/>
                <CommentInput/>
                <CommentsList comments={comments}/>
                
            </>
        }
        {
            error && !post && <h1>{error}</h1>
        }
        
    </div> );
}

export default PostDetails;