import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//共用组件引入
import Header from './components/header';
import NavBar from './components/navBar';
import Main from './components/Main';
//基础样式引入
import './styles/App.css'

ReactDOM.render(
    <Router>
        <div className="container">
            <div className="navBar">
                <NavBar/>,
            </div>
            <div className="main">
                <Header/>
                <Main/>
            </div>
        </div>
    </Router>
    ,
    document.getElementById('app')
);
