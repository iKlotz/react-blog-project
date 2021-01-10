import React from "react";
import EditPost from "../components/Posts/EditPost";

function EditPostPage (props) {
    return (
        <div>
            <EditPost {...props}/>
        </div>
    )
}

export default EditPostPage;