/**
 * Created by lan on 16/5/23.
 */

'use strict';
import {
    AppRegistry,
    StyleSheet,
    View,
    Navigator,
    Platform,
    BackAndroid
} from 'react-native';

import React, { Component } from 'react';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

import HomePage from './home';
import AndroidBackEventQueue from './AndroidBackEventQueue';

var { NativeModules } = require('react-native');

class CustomNavigator extends Navigator {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.pop = () => {
            super.pop();
            const routers = this.getCurrentRoutes();
            if (routers.length <= 1) {
                NativeModules.ActivityModule.finishActivity("");
            }
        }

        this.push = (route) => {
            super.push(route);
        }
    }
}

export default class Ubook extends Component {
    // 构造
    render(){
        var routeName = this.props.routeName;
        return (
            <View style={{flex:1,backgroundColor:'#f6f6f6'}}>
                <CustomNavigator
                    ref={nav => {this.navigator = nav;}}
                    initialRoute={{name:routeName, component:HomePage,params:{...this.props}}}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                />
            </View>
        );
    }

    configureScene(route) {
        if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
        }
        return {...Navigator.SceneConfigs.HorizontalSwipeJump,gestures:null};
    }

    renderScene(route, navigator) {
        switch (route.name) {
            case 'home':
                return <HomePage {...route.params} navigator={navigator}/>;
            default:
                var Component = route.component;
                if (route.component) {
                    return <Component {...route.params} navigator={navigator}/>
                }
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);

            RCTDeviceEventEmitter.addListener('pushPage',(data) => {
                this.navigator && data && this.navigator.push({
                    name:data.routeName,
                    params:data
                })
            });
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        for (var i = AndroidBackEventQueue.backEventQueue.length - 1; i >= 0; i--) {
            if (AndroidBackEventQueue.backEventQueue[i]()) {
                return true;
            }
        }

        const routers = this.navigator.getCurrentRoutes();
        if (routers.length > 1) {
            this.navigator.pop();
            return true;
        }

        return false;
    };
}