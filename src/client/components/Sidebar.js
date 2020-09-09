import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Sidebar(){
    let { id } = useParams();
    return (
        <aside className="side-bar-section">
            <label className="title">Latest</label>
            <ul className="side-bar-list">
                <li>
                    <span>Blog post #1</span><Link to="./post/1">here</Link>
                </li>
                <li>
                    <span>Blog post #2</span><Link to="./post/2">here</Link>
                </li>
                <li>
                    <span>Blog post #3</span><Link to="./post/3">here</Link>
                </li>
            </ul>
            <hr/>
            <label className="title">Popular</label>
            <ul className="side-bar-list">
                <li>
                    <span>Blog post #1</span><a href="">here</a>
                </li>
                <li>
                    <span>Blog post #2</span><a href="">here</a>
                </li>
                <li>
                    <span>Blog post #3</span><a href="">here</a>
                </li>
            </ul>
        </aside>
    );
}
export default Sidebar;