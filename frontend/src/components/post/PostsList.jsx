import PostsListClasses from './posts-list.module.css';
import Post from './Post';

const PostsList = ({posts}) => {
    console.log(posts);
    return ( <div className={PostsListClasses['posts-list']}>
        
        {
            posts.map((post, num)=>{
                let isLast = num === posts.length-1;
                return (<Post
                        key={post._id}
                        isLast={isLast}
                        post={post}
                    />)
            })
        }
    </div> );
}

export default PostsList;