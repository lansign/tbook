/**
 * Created by Guang on 16/5/31.
 */

"use strict";

import React from 'react'
import {
    ListView
} from 'react-native'

import CardWrapper from './CardWrapper'
import BookDetail from '../detail'

var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});


export default class BookListView extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            books:[]
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            books:nextProps.data
        })
    }

    renderRow(rowData,sectionID,rowID){
        return(
            <CardWrapper data={rowData} onPress={this.onItemClick.bind(this)}/>
        )
    }

    onItemClick(rowData){
        this.props.navigator.push({
            component:BookDetail,
            name:'bookDetail',
            params:{data:rowData}
        })
    }

    render(){
        return(
            <ListView
                dataSource={ds.cloneWithRows(this.state.books)}
                enableEmptySections={true}
                renderRow={this.renderRow.bind(this)}/>
        )
    }
}