import SwitchClasses from '../navbarButtons.module.css';
import { useState } from 'react';

const SwitchTheme = () => {
  const [isChecked, setIsChecked] = useState(true);
      
  const handleToggle = (e) => {
    e.stopPropagation();
      setIsChecked((prev) => !prev);
      if(e.target.checked) {
        document.querySelector("body").setAttribute("data-theme", "dark");
      } else {
        document.querySelector("body").setAttribute("data-theme", "light");

      }
        
  };

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
