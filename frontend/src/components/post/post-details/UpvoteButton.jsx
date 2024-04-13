import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import UpvoteClasses from './../post.module.css';

const UpvoteButton = ({ postId, upvote, setUpvote, handleUpvote, upvoteNum }) => {
    
    const { user } = useAuthContext();
    const id = useParams().id || postId;



    useEffect(()=>{
        const setUpvoteInitialState = ()=>{
            fetch(`http://localhost:4000/api/users/upvotes/${id}`, {
                headers: {
                    'Authorization':`Bearer ${user?.token}`
                }
            })
            .then(response=> {
                return response.json();
            })
            .then(isUpvoted=> {
                setUpvote(isUpvoted);
            })
            .catch(err=> {
                console.log(err);
            })
        }
        setUpvoteInitialState();

    }, [id, user?.token]);


    const upvoteCheckedIcon = (
        <BiUpvote
            onClick={handleUpvote}
            size={20}
        />)

    const upvoteUncheckedIcon = (
        <BiSolidUpvote 
            onClick={handleUpvote}
            size={20}
        />)

    return ( <div className={UpvoteClasses['vote-button']}>
        {upvote? upvoteUncheckedIcon:upvoteCheckedIcon }
        <p>{upvoteNum}</p>
    </div> );
}
 
export default UpvoteButton;