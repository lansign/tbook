/**
 * Created by lan on 16/6/1.
 */


import App from '../../components/App'
import Edit from './Edit'
import Detail from './detail'
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

function List({ list }, context) {
    return (
        <div >
            <p>page List2</p>
        </div>
    );
}

export default {

    path: '/article',

    action({ render, context}) {
        return render(
            <App context={context}>
                <List />
            </App>
        );
    }
};