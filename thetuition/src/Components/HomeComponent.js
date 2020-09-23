import React from 'react';
import HeaderComponent from './HeaderComponent';
import ViewComponent from './ViewComponent';

function HomeComponent(props) {
    return (
        <div>
            <HeaderComponent />
            <ViewComponent />
        </div>
    );
}

export default HomeComponent;