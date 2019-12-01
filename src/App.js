import React, { useEffect, useState } from 'react';
import './App.css';

import BlogHeader from './components/Header/BlogHeader';
import Form from './components/Form/Form';
import Timeline from './components/Timeline/Timeline';

function App() {

  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(null);
  const [editingMode, setEditingMode] = useState({
    isEditing: false,
    editingPost: null,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setStatus(1);
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
      .then(response => response.json())
      .then(json => setPosts(json.reverse()))
      .then(() => setStatus(2));
  }

  const deletePost = (postId) => {
    setStatus(1);
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE'
    })
      .then(() => postsAction('delete', postId))
      .then(() => setStatus(4));
  }

  const updatePost = (postBody) => {
    setStatus(1);
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify(postBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => postsAction('update', postBody.id, json))
      .then(() => setEditingMode({ ...editingMode, isEditing: false }))
      .then(() => setStatus(5));
  }

  const addPost = (postBody) => {
    setStatus(1);
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => postsAction('add', json.id, json))
      .then(() => setStatus(3));
  }

  const postsAction = (type, postId = null, postBody = null) => {

    const action = {
      add: () => {
        const newPosts = [...posts];
        newPosts.push(postBody);
        return newPosts;
      },
      delete: () => posts.filter(post => post.id !== postId),
      update: () => posts.map((post) => {
        let newPost = { ...post };
        if (post.id === postId) newPost = postBody;
        return newPost;
      }),
      default: posts,
    };

    const newPosts = [...action[type]() || action.default];
    setPosts(newPosts);
  }

  const editPost = (post) => {
    setEditingMode({
      isEditing: true,
      editingPost: post,
    });
  }

  return (
    <div className="App">
      <BlogHeader title="Blog do Jojo" status={status} />

      <div className="blog-container">
        
        <Form propagateAdd={addPost} propagateUpdate={updatePost} editingMode={editingMode} />

        <Timeline posts={posts} propagateDelete={deletePost} propagateEditPost={editPost} />

      </div>
    </div>
  );
}

export default App;
