import React from 'react';
import { Menu, Icon } from 'antd';
import {NavLink} from 'react-router-dom';
import '../styles/navBar.css';
const SubMenu = Menu.SubMenu;

class NavBar extends React.Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div className={this.state.collapsed?'curNavBar':'navBar-wrapper'}>
        <div className="button-wrapper" onClick={this.toggleCollapsed}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <div className={this.state.collapsed?'curLogo':'logon-wrapper'}></div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>供应商管理</span></span>}>
            <Menu.Item key="1">
              <NavLink exact to="/">待完善机构</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="./supplier">待审核机构</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/">待审核企业对公帐号</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>渠道商审核</span></span>}>
            <Menu.Item key="5">待审核渠道商</Menu.Item>
            <Menu.Item key="6">已审核渠道商</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default NavBar;