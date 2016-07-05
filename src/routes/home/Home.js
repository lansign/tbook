/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes,Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Header from './Header'
import Personal from './PersonalCenter'
import CardWrapper from './Home.Card'

const title = '技术博客';

class Home extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    render() {
        this.props.context.setTitle(title);
        var width = this.state && this.state.isPersonalShow ? '75%' : '100%'
        return (
            <div className={s.root}>
                <Personal
                    onVisibleChange={(isShow) => {
                        this.setState({isPersonalShow: isShow})
                    }
                }/>
                <div style={{maxWidth:'850px', width: width, flexDirection: 'column'}}>
                    <Header title="技术博客"/>

                    <div className={s.container}>
                        <ul className={s.news}>
                            {this.props.books.map((item, index) => (
                                <li key={index} className={s.newsItem}>
                                    <CardWrapper book={item}/>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <a href="/article/add">
                        <div style={{display: 'flex',position:'fixed',height: 50,width:50,backgroundColor: '#d94b40',
                    bottom:30,right:40, borderRadius:"25px", borderWidth:'1px', alignItems: 'center', justifyContent: 'center'}}>
                            <img src={require('./img/add@2x.png')}/>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
