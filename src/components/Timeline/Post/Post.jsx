import React, { useState, useEffect } from 'react';
import './Post.css';

function Post({ postInfo, propagateDelete }) {

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postInfo.id}`)
      .then(response => response.json())
      .then(json => setComments(json))
  }

  useEffect(() => {
    if (!showComments) {
      setComments([]);
    } else {
      fetchComments();
    }
  }, [showComments]);

  const deletePost = (postId) => propagateDelete(postId);

  return (
    <>
      <div className="Post">
        <p onClick={() => setShowComments(!showComments)}>{postInfo.title}</p> &nbsp;&nbsp;
        <div className="actions">
          <b onClick={() => deletePost(postInfo.id)}>x</b> &nbsp;
          {/* <b>✏️</b> */}
        </div>
      </div>

      <div className={`Comments ${showComments ? 'visible' : ''}`}>
        {comments.map((comment, index) => {
          return <p key={index}>{comment.body}</p>
        })}
      </div>
    </>
  );
}

export default Post;
