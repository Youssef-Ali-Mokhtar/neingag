import PostClasses from './post.module.css';
import { Link } from 'react-router-dom';
import PostHeader from './post-details/PostHeader';
import PostBar from './post-details/PostBar';

const Post = ({post, isLast}) => {

    const postClasses = `${PostClasses['post']} ${isLast?PostClasses['is-last']:''}`;

    return ( <div className={ postClasses }>
        <PostHeader category='Humor' post={post}/>
        <div className={PostClasses['post-content-holder']}>
            <Link to={`/${post._id}`}><h1 className={PostClasses['post-title']}>{post.title}</h1></Link>
            <p className={PostClasses['post-description']}>{post.description}</p>
        </div>
        <PostBar post={post} isPostDetails={false}/>
    </div> );
}

export default Post;