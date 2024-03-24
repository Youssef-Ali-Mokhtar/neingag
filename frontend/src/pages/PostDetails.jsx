import PostDetailsClasses from './post-details.module.css';
import useFetchPosts from '../hooks/useFetchPosts';
import { useParams } from 'react-router-dom';
import PostBar from '../components/post/post-details/PostBar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PostDetails = () => {
    const [bookmark, setBookmark] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const setBookmarkInitialState = ()=>{
            fetch(`http://localhost:4000/api/users/bookmarks/${id}`)
            .then(response=>{
                return response.json();
            })
            .then(isBookmark=>{
                console.log("Bookmark2: ", isBookmark);
                setBookmark(isBookmark);
            })
            .catch(err=>{
                console.log(err);
            })
        }
        setBookmarkInitialState();

    }, [id]);

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

    const handleBookmark = ()=> {
        fetch(`http://localhost:4000/api/users/bookmarks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: id
            })
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data=>{
            console.log(data);
            setBookmark(prev=>!prev);
        })
        .catch(err => {
            console.log(err);
        });
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
                <PostBar
                    handleDelete={handleDelete}
                    handleBookmark={handleBookmark}
                    bookmark={bookmark}
                    />
            </>
        }
        {
            error && !posts && <h1>{error}</h1>
        }
        
    </div> );
}

export default PostDetails;