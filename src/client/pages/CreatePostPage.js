import React from "react";
import AddPost from "../components/Posts/AddPost";

function CreatePostPage (props) {
    return (
        <div>
            <AddPost {...props}/>
        </div>
    )
}

export default CreatePostPage;