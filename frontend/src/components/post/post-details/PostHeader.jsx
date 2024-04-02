import PostHeaderClasses from './../post.module.css';
import { Link } from 'react-router-dom';
import { matchPicture } from '../../../util/utilFunctions';

const PostHeader = ({category, post}) => {
    return ( <div className={PostHeaderClasses['post-header']}>
        <div className={PostHeaderClasses['image-holder']}>
            <img src={matchPicture(post.category)} alt="pic"/>
        </div>
        <div className={PostHeaderClasses['text-holder']}>
                <h2> {post.category} </h2>
                <Link to={`/profile/${post.userId?._id}`}><p> {post.userId?.username} </p></Link>
        </div>
</div> );
}
 
export default PostHeader;