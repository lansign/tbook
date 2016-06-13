/**
 * Created by Guang on 16/6/13.
 */

import React from 'react'
import s from './Add.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

var img = {
    login: require('./img/icon@1x.png'),
    edit: require('./img/edit@1x.png')
};

class Header extends React.Component{

    render(){
        return(
            <div className={s.header}>
                <div className={s.header_wrapper}>
                    <img src={img.login} />
                    <div className={s.title}>
                        Technology Book
                    </div>
                </div>

                <div className={s.header_wrapper}>
                    <div className={s.header_split}></div>
                    <img src={img.edit} />
                    <div className={s.push_text}>
                        发布
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(s)(Header)