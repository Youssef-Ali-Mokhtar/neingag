import settingsClasses from './settings.module.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { extractAvatar, pickAvatar } from '../util/utilFunctions';

const Settings = () => {
    const [settings, setSettings] = useState({username:'', bio:'', avatarNum:null});
    const { user } = useAuthContext();
    
    useEffect(()=> {
        const fetchProfile = ()=> {
            fetch(`http://localhost:4000/api/users/profile/${user?.userId}`)
            .then((response)=>{
                return response.json();
            })
            .then(data=>{
                const {
                    username,
                    bio,
                    avatarNum
                } = data;

                setSettings({
                    username,
                    bio,
                    avatarNum
                })

            })
            .catch(err=>{
                console.log(err.message);
            })
        }
        fetchProfile();
    },[user]);

    const onChangeSettings = (e)=> {
        setSettings(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }));
    }

    const handleAvatar = ()=> {
        const currentAvatar = pickAvatar();
        setSettings(prev=>({
            ...prev,
            avatarNum: currentAvatar.num
        }))
    }

    const handleSubmit = ()=> {
        // fetch(`http://localhost:4000/api/users/profile/${user?.userId}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({})
        // })
        // .then(response=> {
        //     console.log(response);
        //     return response.json();
        // })
        // .then(data=> {
        //     console.log(data);

        // })
        // .catch(err=> {
        //     console.log(err.message);
        // })
        console.log(settings);
    }

    return ( <div className={settingsClasses['settings']}>
        <img src={extractAvatar(settings.avatarNum)} alt="pic"/>
        <button onClick={handleAvatar}>Random</button>
        <input 
            type="text" 
            placeholder='username'
            name="username"
            onChange={onChangeSettings}
            value={settings.username}
        />
        <input 
            type="text" 
            placeholder='bio'
            name="bio"
            onChange={onChangeSettings}
            value={settings.bio}
        />
        <button onClick={handleSubmit}>Save Changes</button>
    </div> );
}
 
export default Settings;