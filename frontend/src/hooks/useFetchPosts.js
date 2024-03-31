import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

const useFetchPosts = (url, token) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    console.log("useFetchPosts: ", user?.token);
    const fetchPosts = () => {
      setLoading(true);
      setError(null);
      fetch(url, {
        headers: {
          'authorization': `Bearer ${user?.token}`
        }
      })
        .then((response) => {
          console.log('RESPONSE!');
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          setPosts(data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    };
    

    fetchPosts();
    
    
  }, [url, user?.token]);

  return { posts, error, loading };
};

export default useFetchPosts;
