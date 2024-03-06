import SwitchClasses from './switchTheme.module.css';
import { useState } from 'react';

const SwitchTheme = () => {
  const [isChecked, setIsChecked] = useState(true);
      
  const handleToggle = () => {
      setIsChecked((prev) => !prev);
  };
  console.log(isChecked);
  return ( 
    <div>
      <label className={SwitchClasses.switch}>
        <input type="checkbox" checked={isChecked} onChange={handleToggle}/>
        <span className={SwitchClasses.slider + ' ' + SwitchClasses.round}></span>
      </label>
    </div>
  );
}
 
export default SwitchTheme;
