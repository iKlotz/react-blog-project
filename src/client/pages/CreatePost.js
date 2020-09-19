import React from "react";
import AddPost from "../components/AddPost";

function CreatePost (props) {
    return (
        <div>
            <AddPost {...props}/>
        </div>
    )
}

export default CreatePost;