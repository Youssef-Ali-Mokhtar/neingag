import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import deleteButtonClasses from './../post.module.css';

const DeleteButton = ({ commentId, refetch }) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { id } = useParams();
    
    const handleDelete = () => {
        console.log(commentId);
        fetch(`http://localhost:4000/api/posts/${id}/${commentId?commentId:''}`, {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${user?.token}`,
            }
        })
        .then(response => {
            console.log(response);
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