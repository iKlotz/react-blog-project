import React from 'react';
import '../../App.css';

import MainSection from "../components/MainSection";
import Sidebar from "../components/Sidebar";

function Home() {
    return (
        <div>
            <MainSection/>
            <Sidebar/>
        </div>
    );
}

export default Home;