import React, { useEffect, useState } from 'react';
import './App.css';

import BlogHeader from './components/Header/BlogHeader';
import Form from './components/Form/Form';
import Timeline from './components/Timeline/Timeline';

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts();
  }, []);


  const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
      .then(response => response.json())
      .then(json => setPosts(json))
  }

  const deletePost = (postId) => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE'
    })
      .then(() => postsAction('delete', postId));
  }

  const updatePost = (postBody) => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify(postBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => postsAction('update', json.id, json))
  }

  const addPost = (postBody) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => postsAction('add', json.id, json))
  }

  const postsAction = (type, postId = null, postBody = null) => {

    const action = {
      // adiciona um post
      add: () => {
        const newPosts = [...posts];
        newPosts.push(postBody);
        return newPosts;
      },
      // deleta um post
      delete: () => posts.filter(post => post.id !== postId),
      // atualiza post editado
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

  return (
    <div className="App">
      <BlogHeader title="Blog do Jojo" />

      <div className="blog-container">
        
        <Form propagateAdd={addPost} />

        <Timeline posts={posts} propagateDelete={deletePost} />

      </div>

      {/* <span onClick={() => updatePost({
        userId: 1,
        id: 1,
        title: 'Titulo editado!!!',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      })}>Atualizar</span> */}
    </div>
  );
}

export default App;
