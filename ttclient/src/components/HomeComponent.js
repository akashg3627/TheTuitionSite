import React from 'react';
import Header from './HeaderComponent';
import Footer from './Footer';
function HomeComponent(props) {
    return (
        <div>
            <Header />
            
            <img src="logo512.png" width="1600px"></img>
            <Footer />
        </div>
    );
}

export default HomeComponent;