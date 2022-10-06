import React from 'react';
import ReactDom from 'react-dom';
window.React = React

import App from './app.js';

export default () => <App/>;

export const mount = (Component) => {
    ReactDom.render(
        <Component/>,
        document.getElementById('app')
    );

    if(module.hot) {
        module.hot.accept('./app', ()=> {
            ReactDom.render(
                <App/>,
                document.getElementById('app')
            );
        })
    }
};

export const unmount = () => {
    ReactDom.unmountComponentAtNode(document.getElementById('app'));
};