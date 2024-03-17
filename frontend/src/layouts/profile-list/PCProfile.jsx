import PCProfileClasses from './pc-profile.module.css';
import { forwardRef } from 'react';

const PCProfile = (props, ref) => {

    return ( <div className={PCProfileClasses['profile']} ref={ref}>
        Profile
    </div> );
}
 
export default forwardRef(PCProfile);