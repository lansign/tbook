/**
 * Created by Guang on 16/5/31.
 *
 * @providesModule TBHeader
 */

import React,{
    Component,
    PropTypes
} from 'react'

import {
    Platform,
    Image,
    View,
    ToolbarAndroid,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import {Text} from 'TBText';


class TBHeaderAndroid extends Component{

    handleActionSelected(position: number) {
        let items =  [];
        if (this.props.rightItem) {
            items = [this.props.rightItem, ...items];
        }
        const item = items[position];
        item && item.onPress && item.onPress();
    }

    render(){
        const {leftItem,rightItem} = this.props;
        let actions = [];
        if (rightItem) {
            const {title, icon, layout} = rightItem;
            actions.push({
                icon: layout !== 'title' ? icon : undefined,
                title: title,
                show: 'always',
            });
        }

        return(
            <View style={styles.toolbarContainer}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    navIcon={leftItem && leftItem.icon}
                    onIconClicked={leftItem && leftItem.onPress}
                    title={this.props.title}
                    actions={actions}
                    onActionSelected={this.handleActionSelected.bind(this)}/>
            </View>
        )
    }
}

class TBHeaderIOS extends Component{

    render(){
        const {title,leftItem,rightItem} = this.props;
        return(
            <View style={styles.header}>

                <View style={styles.leftItem}>
                    <ItemWrapperIOS {...leftItem}/>
                </View>

                <View
                    accessible={true}
                    accessibilityLabel={title}
                    accessibilityTraits="header"
                    style={styles.centerItem}>

                    <Text style={styles.titleText}>
                        {title}
                    </Text>
                </View>

                <View style={styles.rightItem}>
                    <ItemWrapperIOS {...rightItem}/>
                </View>
            </View>
        )
    }
}

class ItemWrapperIOS extends Component{

    render(){
        const {title,icon,onPress} = this.props;
        var center;
        if (title){
            center = (
                <Text>
                    {title}
                </Text>
            );
        }else if (icon){
            center = <Image source={icon} />
        }

        if (center){
            return(
                <TouchableOpacity
                    onPress={() =>{
                        onPress && onPress();
                    }}
                    style={styles.itemBox}>
                    {center}
                </TouchableOpacity>
            )
        }

        return null
    }
}

class TBHeader extends Component{

    static propTypes ={
        title:PropTypes.string,
        leftItem:PropTypes.object,
        rightItem:PropTypes.object
    };

    render(){
        if(Platform.OS == 'ios'){
            return <TBHeaderIOS {...this.props}/>
        }else {
            return <TBHeaderAndroid {...this.props}/>
        }
    }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({

    header: {
        backgroundColor: 'transparent',
        paddingTop: STATUS_BAR_HEIGHT,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toolbarContainer: {
        paddingTop: STATUS_BAR_HEIGHT,
    },
    toolbar: {
        height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    },
    titleText:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    itemBox:{
        padding:11
    },
    centerItem: {
        flex: 2,
        alignItems: 'center',
    },
    leftItem: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightItem:{
        flex: 1,
        alignItems: 'flex-end',
    }
});

module.exports = TBHeader;