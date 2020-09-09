import React from "react";
import { Link } from 'react-router-dom';

function PostCard(props) {
    return (
        <div>
            <div className="post">
                <label className="post-title">
                    <Link to={`/post/${props.id}`} className="post-title"> {props.title} </Link>
                </label>
                <img width="60" height="60" className="post-img" src={props.image}/>

                <p className="post-content">
                    {props.content}
                </p>

                <label className="post-footer">
                    Published {props.published} by {props.author}
                </label>
            </div>
        </div>
    );
}

export default PostCard;

