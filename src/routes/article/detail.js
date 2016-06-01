/**
 * Created by lan on 16/6/1.
 */

import React from 'react';
import App from '../../components/App';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

function Detail({ article }, context) {
    return (
        <div >
            <p>page Detail</p>
        </div>
    );
}

export default {

    path: '/article/detail/:id',

    action({ render, context}) {
        console.log(context)


        return render(
            <App context={context}>
                <Detail />
            </App>
        );
    }

};