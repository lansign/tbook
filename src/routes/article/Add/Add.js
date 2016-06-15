/**
 * Created by lan on 16/6/2.
 */

import React, { Component, PropTypes }  from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Add.css';
import fetch from '../../../core/fetch'
import Header from './Add.Header'

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
                <Header />
                <div className={s.center}>
                    <textarea className={s.inputFrame}
                        type="text"
                        placeholder="Say something..."
                        onChange={(e) => {
                                this.setState({text: e.target.value})
                            }
                        }/>

                    <div className={s.showFrame}>
                        <div style={{display:'flex',flex:1,paddingTop:10}}>
                            <input type="text" placeholder="无标题文章"
                                   className={s.inputTitle}
                                   style={{display:'flex',flex:1,height:40,fontSize: 30,paddingLeft:20,color:'#555555'}}
                                   onChange={(e) =>{
                                        this.state.title = e.target.value
                                   }}/>
                        </div>
                        <hr/>
                        <span className={s.showFrame_span}  dangerouslySetInnerHTML= {this.rawMarkup()}/>
                        <button className={s.button} type="submit" onClick={() => {this.send(this.state.text,this.state.title)}}>
                            <img style={{marginRight:'10px'}} src={img.edit} />

                            发布
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    rawMarkup() {
        //md.setOptions({
        //    highlight: function (code, lang, callback) {
        //        require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
        //            callback(err, result.toString());
        //        });
        //    }
        //});
        return { __html: md(this.state.text) };
    }

    send(text,title) {
        if (!title){
            alert("标题不可为空");
            return
        }
        var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };

        var quote = function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

            rx_escapable.lastIndex = 0;
            return rx_escapable.test(string)
                ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
                : "\"" + string + "\"";
        }

        var requestText = quote(`${text}`)

        console.log("requestText", requestText)
        fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `mutation{article(title: "${title}", content: ${requestText}) {id}}`
            }),
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