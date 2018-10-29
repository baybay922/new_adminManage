import React from 'react';
import {Icon, Popover, Drawer, Modal, Timeline} from 'antd';
import '../styles/header.less'

const text = <span>个人信息</span>;
const content = (
  <div>
    <p>账户：baybay</p>
    <p>手机：15600606171</p>
  </div>
);
class Header extends React.Component{
    state = { 
        visible: false,
        promptState: false
     };
    showDrawer = () => {
        this.setState({
        visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    showModal = () => {
        this.setState({
            promptState: true,
        });
    }
    
    handleOk = () => {
        this.setState({
            promptState: false,
        });
    }
    
    handleCancel = () => {
        this.setState({
            promptState: false,
        });
    }
    render(){
        return(
            <div className='header-warpper'>
                <div className={this.state.visible ? 'openNews' : 'userInfo'}>
                    <div className='message' onClick={this.showDrawer}>
                        <Icon type="mail" theme="outlined"></Icon>
                        <p>消息</p>
                        <span className='meg-number'>12</span>
                    </div>
                    <div className="user">
                        <Popover placement="bottom" title={text} content={content} trigger="click">
                        <Icon type="user" theme="outlined" />
                            <p>我的</p>
                        </Popover>
                    </div>
                    <div onClick={this.showModal}>
                        <Icon type="export" theme="outlined" />
                        <p>退出</p>
                    </div>
                </div>
                <Drawer
                title="消息列表"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                >
                {/* <ul className="news-list">
                    <li>
                        <h2>这是一条信息</h2>
                        <article>
                            <span>多加</span>文章的正文从现在开始
                        </article>
                    </li>
                </ul> */}
                <Timeline className="news-list">
                    <Timeline.Item color="red">
                        <p>2015年9月1号</p>
                        <p>渠道商15600606171申请了在线通过，请审批！<span>查看</span></p>
                    </Timeline.Item>
                </Timeline>
                </Drawer>
                <Modal
                title="提示"
                visible={this.state.promptState}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                确定要退出吗？
                </Modal>
            </div>
            
        )
    }
}

export default Header;