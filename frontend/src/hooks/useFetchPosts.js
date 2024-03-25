import { useState, useEffect } from 'react';

const useFetchPosts = (url) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      setError(null);
      fetch(url)
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
  }, [url]);

  return { posts, error, loading };
};

export default useFetchPosts;
