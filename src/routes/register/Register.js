/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes }  from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';

class Register extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text:""
        };
    }

    render() {
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1>注册</h1>
                    <form method="post">
                        <div className={s.formGroup}>
                            <label className={s.label} htmlFor="Email">
                                Email address:
                            </label>
                            <input
                                className={s.input}
                                id="Email"
                                type="text"
                                name="Email"
                                autoFocus
                            />
                        </div>
                        <div className={s.formGroup}>
                            <label className={s.label} htmlFor="password">
                                Password:
                            </label>
                            <input
                                className={s.input}
                                id="password"
                                type="password"
                                name="password"
                            />
                        </div>
                        <div className={s.formGroup}>
                            <button className={s.button} type="submit" onclick={() => {

                            }}>
                                注册
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);
