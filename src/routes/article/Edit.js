/**
 * Created by lan on 16/6/1.
 */

import App from '../../components/App';
import Detail from './Detail';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

function Edit({ list }, context) {
    return (
        <div >
            <p>page Edit</p>
        </div>
    );
}

export default {

    path: '/article/edit/:id',

    action({ render, context }) {
        return render(
            <App context={context}>
                <Edit/>
            </App>
        );
    }

};