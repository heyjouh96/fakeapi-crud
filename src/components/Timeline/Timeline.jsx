import React from 'react';
import './Timeline.css'

import Post from './Post/Post';

function Timeline({ posts, propagateDelete }) {

  return (
    <div className="Timeline">
      <h2>Timeline</h2>
      {posts.length > 0
        ? posts.map((post, index) => <Post
                                        key={index}
                                        postInfo={post}
                                        propagateDelete={propagateDelete}
                                      />)
        : <p>no posts yet...</p>
      }
    </div>
  );
}

export default Timeline;
