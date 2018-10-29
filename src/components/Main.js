require('normalize.css/normalize.css');
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//页面引入
import Index from './index';
import Supplier from './Supplier'
import '../styles/theme.less'
class AppComponent extends React.Component {
  render() {
    return (

        <div className="theme">
          <Route exact path="/" component={Index} />
          <Route path="/Supplier" component={Supplier} />
        </div>
    );
  }
}


AppComponent.defaultProps = {
};

export default AppComponent;
