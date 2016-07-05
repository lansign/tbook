/**
 * Created by lan on 16/6/2.
 */

import React, { Component, PropTypes }  from 'react';
import withStyles from '../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './Add.css';
import fetch from '../../core/fetch'
import Header from './Add.Header.js'

const md = require('marked');

var img = {
    edit: require('./img/edit@1x.png')
};

class Add extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text:""
        };
      }

    componentWillMount() {
        this.props.context.setTitle("添加文章")
    }

    render() {
        return (
            <div id="add" className={s.root}>
                <Header text={this.state.text}/>
                <div className={s.center}>
                    <textarea className={s.inputFrame}
                        type="text"
                        onChange={(e) => {
                                this.setState({text: e.target.value})
                            }
                        }/>

                    <div className={s.showFrame}>
                        <span className={s.showFrame_span}  dangerouslySetInnerHTML= {this.rawMarkup()}/>
                    </div>
                </div>
            </div>
        );
    }

    rawMarkup() {
        //Custom highlight options
        //md.setOptions({
        //    highlight: function (code, lang, callback) {
        //        require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
        //            callback(err, result.toString());
        //        });
        //    }
        //});
        return { __html: md(this.state.text) };
    }
}

export default withStyles(s)(Add);