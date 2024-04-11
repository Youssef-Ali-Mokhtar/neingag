import { BiDownvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const DownvoteButton = ({ postId, downvote, handleDownvote }) => {
    
    const { user } = useAuthContext();
    const id = useParams().id || postId;



    useEffect(()=>{
        // const setUpvoteInitialState = ()=>{
        //     fetch(`http://localhost:4000/api/users/downvotes/${id}`, {
        //         headers: {
        //             'Authorization':`Bearer ${user?.token}`
        //         }
        //     })
        //     .then(response=> {
        //         return response.json();
        //     })
        //     .then(isDownvoted=> {
        //         setDownvote(isDownvoted);
        //     })
        //     .catch(err=> {
        //         console.log(err);
        //     })
        // }
        // setUpvoteInitialState();

    }, [id, user?.token]);


    const downvoteCheckedIcon = (
        <BiDownvote
            onClick={handleDownvote}
            size={20}
        />)

    const downvoteUncheckedIcon = (
        <BiSolidDownvote 
            onClick={handleDownvote}
            size={20}
        />)

    return ( <>
        {downvote? downvoteUncheckedIcon:downvoteCheckedIcon }
    </> );
}
 
export default DownvoteButton;