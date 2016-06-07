/**
 * Created by lan on 16/6/2.
 */

import React, { Component, PropTypes }  from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Add.css';
import MarkdownIt from 'markdown-it'
import fetch from '../../../core/fetch'

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
                            this.setState({text: e.target.value})
                        }
                    }/>
                <span className={s.inputFrame} dangerouslySetInnerHTML= {this.rawMarkup()}/>
                <button className={s.button} type="submit" onClick={() => {this.send(this.state.text)}}>
                    发布
                </button>
            </div>
        );
    }

    rawMarkup() {
        return { __html: md.render(this.state.text) };
    }

    send(text) {
        var requestText = text.replace(/\n/g,"\\n")

        var json = JSON.stringify({
            query: `mutation{article(title: "test", content: "${requestText}") {id}}`
        });
        console.log("send json ", json)

        fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: json,
            credentials: 'include'
        }).then(resp => {
            return resp.json()
        }).then(data => {
            console.log(data)
            if (data.data.article.id) {
                alert("发布成功!")
            } else {
                alert("发布失败!")
            }
        }).catch(err => {
            alert(err)
        })
    }


}

export default withStyles(s)(Add);