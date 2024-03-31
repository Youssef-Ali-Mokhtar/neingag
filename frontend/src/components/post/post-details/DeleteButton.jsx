import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const DeleteButton = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { id } = useParams();
    
    const handleDelete = ()=>{
        fetch(`http://localhost:4000/api/posts/${id}`, {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${user?.token}`,
            }
        })
        .then(response=> {
            console.log(response);
            navigate('/');
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return ( <MdOutlineDeleteOutline
        onClick={handleDelete}
        size={27}
    /> );
}
 
export default DeleteButton;