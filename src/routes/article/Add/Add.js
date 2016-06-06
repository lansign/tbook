/**
 * Created by lan on 16/6/2.
 */

import Detail from './../detail';
import React, { Component, PropTypes }  from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './Add.css';
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt();

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
                <textarea className={s.inputFrame}
                    type="text"
                    placeholder="Say something..."
                    onChange={(e) => {
                            console.log("text", e.target.value)
                            this.setState({text: e.target.value})
                        }
                    }/>
                <span className={s.inputFrame} dangerouslySetInnerHTML= {this.rawMarkup()}/>
            </div>
        );
    }

    rawMarkup() {
        return { __html: md.render(this.state.text) };
    }
}

export default withStyles(s)(Add);