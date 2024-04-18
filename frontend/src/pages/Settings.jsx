import settingsClasses from './settings.module.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { extractAvatar, pickAvatar } from '../util/utilFunctions';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const [settings, setSettings] = useState({username:'', bio:'', avatarNum:null});
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchProfile = ()=> {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/profile/${user?.userId}`)
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
        fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...settings})
        })
        .then(response=> {
            return response.json();
        })
        .then(data=> {
            navigate(`/profile/${user?.userId}`);
        })
        .catch(err=> {
            console.log(err.message);
        })
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