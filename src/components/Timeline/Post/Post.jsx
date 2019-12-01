import React, { useState, useEffect } from 'react';
import './Post.css';

function Post({ postInfo, propagateDelete, propagateEditPost }) {

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

  const editPost = (post) => propagateEditPost(post);

  return (
    <>
      <div className="Post">
        <div className="content">
          <p onClick={() => setShowComments(!showComments)}>{postInfo.title}</p>
          <span>{postInfo.body}</span>
        </div>
        <div className="actions">
          <b onClick={() => deletePost(postInfo.id)}>x</b> &nbsp;
          <b onClick={() => editPost(postInfo)}>✏️</b>
        </div>
      </div>

      {showComments
        ? (
          <div className="Comments">
            <span>Comentários:</span>
            {comments.map((comment, index) => {
              return <p key={index}>{comment.body}</p>
            })}
          </div>
        )
        : null
      }
    </>
  );
}

export default Post;
