import { useState, useEffect } from 'react';

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      setError(null);
      fetch('http://localhost:4000/api/posts/')
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
    };

    fetchPosts();
  }, []);

  return { posts, error, loading };
};

export default useFetchPosts;
