import React from 'react';
import  Posts from './Posts'

function MainSection(){
    return (
        <section className="post-section">
            <label className="title">This is my blog</label>
            <div id="posts-root" className="posts-list">
                <Posts/>
            </div>
        </section>
    );
}
export default MainSection;