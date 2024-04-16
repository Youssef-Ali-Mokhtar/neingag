import { useState } from 'react';
import CreatePostClasses from './create-post.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Select from 'react-select';

const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: '4px 16px',
      border: `1px solid ${state.isFocused ? 'blue' : 'var(--color-border)'}`,
      borderRadius: '10px',
      outline: 'none',
      boxSizing: 'border-box',
      backgroundColor: 'var(--color-background-primary)',
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '10px 0px',
      cursor:'pointer'
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: 'none',
      }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'var(--color-primary-font)',
      }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--color-background-primary)',
      padding: '12px 16px',
      '&:hover': {
        backgroundColor: 'var(--color-hover)',
        cursor: 'pointer',
      },
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: 'var(--color-background-primary)', // Change the background color of the options container
        border: `1px solid var(--color-border)`,
      }),
  };

const options = [
    {value:'humor', label: 'Humor'},
    {value:'wtf', label: 'WTF'},
    {value:'relationships', label: 'Relationships'},
    {value:'random', label: 'Random'},
];

const CreatePost = () => {
    const [postInput, setPostInput] = useState({title:'', description:'', category:''});
    const navigate = useNavigate();
    const { user } = useAuthContext();


    const onChangeInput = (event)=> {
        setPostInput(prev=>({
            ...prev, 
            [event.target.name]: event.target.value
        }));
    }

    const onChangeSelect = (event)=> {
        setPostInput(prev=>({
            ...prev, 
            category: event.value
        }));
    }

    const handleSubmitInput = (event)=> {
        event.preventDefault();
        fetch('http://localhost:4000/api/posts', {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postInput)
        })
        .then(response=> {
            setPostInput({title:'', description:''});
            navigate('/');
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return ( <div className={CreatePostClasses['create-post']}>
        <form 
            className={CreatePostClasses['input-container']}
            onSubmit={handleSubmitInput}
            >
            <h1 className={CreatePostClasses['create-post-title']}>Create Post</h1>
            <Select
                styles={customStyles}
                options={options} 
                onChange={onChangeSelect}
                isSearchable={false}
                placeholder="Select a category"
                className={CreatePostClasses['select-category']}
            />
            <input
                className={CreatePostClasses['input-title']}
                type='text'
                name='title'
                placeholder='Title'
                value={postInput.title}
                onChange={onChangeInput}
                maxLength={280}
                required
            />
            <textarea
                className={CreatePostClasses['input-description']}
                type='text'
                name='description'
                placeholder='Speak your mind...'
                value={postInput.description}
                onChange={onChangeInput}
                required
                maxLength={1000}
            />
            <div className={CreatePostClasses['input-button-holder']}>
                <button className={CreatePostClasses['input-button']}>Post</button>
            </div>
        </form>
        
    </div> );
}
 
export default CreatePost;