import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from './useAuthContext';

const useFetchPosts = (url, token) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const fetchPosts = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(url, {
      headers: {
        'authorization': `Bearer ${user?.token}`
      }
    })
      .then((response) => {
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
  },[url, user?.token]);

  useEffect(() => {
    fetchPosts();
  }, [url, user?.token, fetchPosts]);

  const refetch = ()=> {
    fetchPosts();
  }

  return { posts, error, loading, refetch };
};

export default useFetchPosts;
