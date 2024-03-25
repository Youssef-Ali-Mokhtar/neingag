import PCProfileClasses from './pc-profile.module.css';
import { forwardRef } from 'react';
import ProfileListItem from './ProfileListItem';

const PCProfile = (props, ref) => {

    return ( <div className={PCProfileClasses['profile']} ref={ref}>
        <ProfileListItem title='My Profile' link='profile'/>
    </div> );
}
 
export default forwardRef(PCProfile);