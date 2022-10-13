import React from 'react';
import ReactDom from 'react-dom';
window.React = React

import "./styles.css"
import { BrowserRouter } from "react-router-dom"
import App from './app.js';

export default () => <App/>;

export const mount = (Component) => {
    ReactDom.render(
        <BrowserRouter>
            <Component />
        </BrowserRouter>,
        document.getElementById('app')
    );
};

export const unmount = () => {
    ReactDom.unmountComponentAtNode(document.getElementById('app'));
};