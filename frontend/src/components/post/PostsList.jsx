import PostsListClasses from './posts-list.module.css';
import Post from './Post';

const PostsList = ({posts}) => {
    return ( <div className={PostsListClasses['posts-list']}>
        {
            posts.map((post, num)=>{
                let isLast = num === posts.length-1;
                return (<Post
                        key={post._id.toString()}
                        id={post._id.toString()}
                        title={post.title}
                        description={post.description}
                        isLast={isLast}
                    />)
            })
        }
    </div> );
}

export default PostsList;