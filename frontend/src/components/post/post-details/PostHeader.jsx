import PostHeaderClasses from './../post.module.css';
import grumpyCat from './../../../assets/grumpy_cat.jpg';
import { Link } from 'react-router-dom';

const PostHeader = ({category, post}) => {
    return ( <div className={PostHeaderClasses['post-header']}>
        <div className={PostHeaderClasses['image-holder']}>
            <img src={grumpyCat} alt="pic"/>
        </div>
        <div className={PostHeaderClasses['text-holder']}>
                <h2> {category} </h2>
                <Link to={`/profile/${post.userId?._id}`}><p> {post.userId?.username} </p></Link>
        </div>
</div> );
}
 
export default PostHeader;