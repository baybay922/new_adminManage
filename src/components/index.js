import React from 'react';
import {Breadcrumb, Pagination} from 'antd';

class Index extends React.Component{
    render(){
        return(
            <div className="bay">
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>审批</Breadcrumb.Item>
                </Breadcrumb>
                
                <div className="pagination">
                    <Pagination defaultCurrent={6} total={50} />
                </div>
            </div>
        );
    }
}
export default Index;