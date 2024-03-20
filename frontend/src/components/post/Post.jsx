import PostClasses from './post.module.css';
import { Link } from 'react-router-dom';

const Post = ({id, title, description, isLast}) => {

    const postClasses = `${PostClasses['post']} ${isLast?PostClasses['is-last']:''}`;

    return ( <Link to={`/${id}`} className={ postClasses }>
        <h1 className={PostClasses['post-title']}>{title}</h1>
        <p className={PostClasses['post-description']}>{description}</p>
    </Link> );
}
 
export default Post;