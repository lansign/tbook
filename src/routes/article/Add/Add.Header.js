/**
 * Created by Guang on 16/6/13.
 */

import React from 'react'
import s from './Add.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

var img = {
    logo: require('./img/icon@1x.png'),
    edit: require('./img/edit@1x.png')
};

class Header extends React.Component{

    render(){
        return(
            <div className={s.header}>
                <div className={s.header_wrapper}>
                    <a href="/">
                        <img src={img.logo} />
                    </a>

                    <div className={s.title}>
                        Technology Book
                    </div>
                </div>

                <button className={s.header_wrapper}
                     onClick={() => {this.send(this.props.text)}}>
                    <div className={s.header_split}></div>
                    <img src={img.edit} />
                    <div className={s.push_text}>
                        发布
                    </div>
                </button>
            </div>
        )
    }

    send(text) {
        if (!text) {
            alert("请输入有效内容!");
            return;
        }

        //获取title标签
        var titleRegex = text.match(/^#[\s]([^\s]*)/);

        if (!titleRegex || !titleRegex[1]) {
            alert("标题不可为空, 您可以使用#来标识文章标题!");
            return
        }

        let title = titleRegex[1];

        //获取image标签
        let imageUrl;
        let imgRegex = text.match(/!\[.*?\]\((.*?)\)/);
        if (imgRegex) imageUrl = imgRegex[1];

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

        fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `mutation{article(title: "${title}", content: ${requestText}, imageUrl:"${imageUrl?imageUrl:""}") {id,imageUrl}}`
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

export default withStyles(s)(Header)