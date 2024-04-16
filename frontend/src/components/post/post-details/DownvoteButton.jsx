import { BiDownvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import DownvoteClasses from './../post.module.css';

const DownvoteButton = ({ downvote, handleDownvote, downvoteNum }) => {
    const isPressedClass = downvote? DownvoteClasses['pressed']:'';

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
    return ( <div className={`${DownvoteClasses['vote-button']} ${isPressedClass}`}>
        {downvote? downvoteUncheckedIcon:downvoteCheckedIcon }
        <p>{downvoteNum}</p>
    </div> );
}
 
export default DownvoteButton;