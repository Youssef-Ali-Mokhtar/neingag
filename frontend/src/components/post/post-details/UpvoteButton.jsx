import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import UpvoteClasses from './../post.module.css';

const UpvoteButton = ({ upvote, handleUpvote, upvoteNum }) => {

    const isPressedClass = upvote? UpvoteClasses['pressed']:'';

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

    return ( <div className={`${UpvoteClasses['vote-button']} ${isPressedClass}`}>
        {upvote? upvoteUncheckedIcon:upvoteCheckedIcon }
        <p>{upvoteNum}</p>
    </div> );
}
 
export default UpvoteButton;