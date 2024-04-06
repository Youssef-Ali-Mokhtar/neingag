// import { useState, useEffect, useCallback } from 'react';
// import { useAuthContext } from './useAuthContext';

// const useFetchPosts = (url, token) => {
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHadMore] = useState(true);
//   const { user } = useAuthContext();
//   const fetchPosts = useCallback(() => {
//     setLoading(true);
//     setError(null);
//     fetch(url+`?page=${page}`, {
//       headers: {
//         'authorization': `Bearer ${user?.token}`
//       }
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch posts');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setLoading(false);
//         console.log(data.length);

//         if(page === 1){
//             setPosts(data);
//         } else {
//             setPosts(prev=>[...prev, ...data]);
//         }
        
//       })
//       .catch((err) => {
//         setLoading(false);
//         setError(err.message);
//       });
//   },[url, user?.token, page]);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   const refetch = ()=> {
//     fetchPosts();
//   }

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   return { posts, error, loading, refetch, handleLoadMore, hasMore };
// };

// export default useFetchPosts;

// import { useEffect, useState } from 'react';
// import {useAuthContext} from './../hooks/useAuthContext';


// const useFetchPosts = (url) => {

//   const {user} = useAuthContext();
//   const [posts, setPosts] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);

//   useEffect(()=>{
//     fetch(url+`?posts=${page}`, {
//         headers: {
//           'authorization': `Bearer ${user?.token}`
//         }
//       })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch posts');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data.length);
//         if(!data.length) {
//             setHasMore(false);
//         }
//         if(page === 1){
//             setPosts(data);
//         } else {
//             setPosts(prev=>[...prev, ...data]);
//         }
        
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
// },[page, user?.token ,url])

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   return {posts, error, hasMore, handleLoadMore};
// }
 
// export default useFetchPosts;