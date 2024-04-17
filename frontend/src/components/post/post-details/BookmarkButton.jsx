
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import BookmarkClasses from './../post.module.css';

const BookmarkButton = ({ postId }) => {
    const [bookmark, setBookmark] = useState(false);
    const { user } = useAuthContext();
    const id = useParams().id || postId;
    // const postId = id ||
    const handleBookmark = ()=> {
        setBookmark(prev=>!prev);
        fetch(`http://localhost:4000/api/users/bookmarks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user?.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: id
            })
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(()=>{
        const setBookmarkInitialState = ()=>{
            fetch(`http://localhost:4000/api/users/bookmarks/${id}`, {
                headers: {
                    'Authorization':`Bearer ${user?.token}`
                }
            })
            .then(response=> {
                return response.json();
            })
            .then(isBookmark=> {
                setBookmark(isBookmark);
            })
            .catch(err=> {
                console.log(err);
            })
        }
        setBookmarkInitialState();

    }, [id, user?.token]);


    const bookmarkCheckedIcon = (
        <FaBookmark 
            onClick={handleBookmark}
            size={20}
            className={BookmarkClasses['bookmark']}
        />)

    const bookmarkUncheckedIcon = (
        <FaRegBookmark 
            onClick={handleBookmark}
            size={20}
        />)

    return ( <>
        {bookmark?bookmarkCheckedIcon: bookmarkUncheckedIcon}
    </> );
}
 
export default BookmarkButton;