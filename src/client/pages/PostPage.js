import React from 'react';
import Post from "../components/Posts/Post";


function PostPage(props) {
    return (
        <div>
            <Post {...props}/>
        </div>
    );
}

export default PostPage;