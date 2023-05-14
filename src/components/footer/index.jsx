import React from 'react';
import { history } from 'umi';

import './index.less';

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    handleToPage = (url) => {
        if(location.pathname === url){
            return;
        }
        history.push(url);
    }
    render(){
        return (
            <footer className="baby-love-footer">
                <div className="baby-love-footer-item" onClick={() => this.handleToPage('/')}>
                    商品
                </div>
                <div className="baby-love-footer-item" onClick={() => this.handleToPage('/shopping-cart')}>
                    购物车
                </div>
            </footer>
        );
    }
}

export default Footer;