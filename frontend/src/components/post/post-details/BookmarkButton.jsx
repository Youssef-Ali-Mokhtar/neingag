
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const BookmarkButton = () => {
    const [bookmark, setBookmark] = useState(false);
    const { user } = useAuthContext();
    const { id } = useParams();

    const handleBookmark = ()=> {
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
                console.log("Bookmark2: ", isBookmark);
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