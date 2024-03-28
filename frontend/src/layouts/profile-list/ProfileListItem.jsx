import ProfileClasses from './pc-profile.module.css';

const ProfileListItem = ({onClick, title}) => {
    return ( <div 
        className={ProfileClasses['profile-list-item']}
        onClick={onClick}
        >
        {title}
    </div> );
}
 
export default ProfileListItem;