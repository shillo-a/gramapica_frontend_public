import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import createStore from './store/index';
import App from './App';
// import './index.css';

ReactDOM.render(
    <React.StrictMode>
    <Provider store={createStore()}>
        <Router>
            <App/>
        </Router>
    </Provider>
    </React.StrictMode>
    , 
    document.getElementById('root')
)

//Подпись разработчика
console.log(
    '%cDeveloped by: Shillo Alexey \nhttps://www.instagram.com/shillo_a/', 
    "color:#FF2B6C;font-weight:bold"
)