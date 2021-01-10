import React from "react";
import { Link } from 'react-router-dom';

function CommentCard(props) {
    return (
        <div>
            <div className="post">
                <label className="post-title">
                     {props.title}
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

export default CommentCard;

