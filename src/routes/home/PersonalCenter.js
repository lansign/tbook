/**
 * Created by lan on 16/7/5.
 */

import React, { Component, PropTypes }  from 'react';

class PersonalCenter extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            windowWidth: 0
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        this.setState({windowWidth: window && window.innerWidth})
        if (this.props.onVisibleChange) {
            this.props.onVisibleChange()
        }
    }

    componentDidMount() {
        if (window && this.state.windowWidth != window.innerWidth) {
            this.handleResize()
        }

        window && window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window && window.removeEventListener('resize', this.handleResize);
    }

    render() {
        if (this.state.windowWidth < 600) {
            return null;
        }

        return (
            <div style={{width: '25%', height:'100%'}}>
                <img style={{position:'fixed', width: '25%', height:'100%'}}
                     src={require('./img/left@1x.jpg')}/>
            </div>
        )
    }
}

export default PersonalCenter;

