import PostHeaderClasses from './../post.module.css';
import { Link } from 'react-router-dom';
import { matchPicture } from '../../../util/utilFunctions';
import { formatDate, capitalizeFirstLetter } from '../../../util/utilFunctions';


const PostHeader = ({category, post}) => {
    return ( <div className={PostHeaderClasses['post-header']}>
        <div className={PostHeaderClasses['image-holder']}>
            <img src={matchPicture(post.category)} alt="pic"/>
        </div>
        <div className={PostHeaderClasses['text-holder']}>
                <Link to={`/interest/${post?.category}`}>
                    <h2> {capitalizeFirstLetter(post.category)} </h2>
                </Link>
                <Link to={`/profile/${post.userId?._id}`}>
                    <p> {post.userId?.username} . {formatDate(post.createdAt)} </p>
                </Link>
        </div>
</div> );
}
 
export default PostHeader;