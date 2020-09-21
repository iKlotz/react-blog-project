import React from "react";
import AddPost from "../components/AddPost";

function CreatePostPage (props) {
    return (
        <div>
            <AddPost {...props}/>
        </div>
    )
}

export default CreatePostPage;