import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import deleteButtonClasses from './../post.module.css';

const DeleteButton = ({ commentId, postId, refetch }) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const id = useParams().id || postId;
    
    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}/${commentId?commentId:''}`, {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${user?.token}`,
            }
        })
        .then(response => {
            if(commentId) {
                refetch();
            } else {
                navigate(`/`);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return ( <MdOutlineDeleteOutline
        onClick={handleDelete}
        size={27}
        className = {deleteButtonClasses['delete-button']}
    /> );
}
 
export default DeleteButton;