/**
 * Created by lan on 16/6/1.
 */

import App from '../../../components/App';
import React from 'react';
import Add from './Add';

export default {

    path: '/article/add',

    action({ render, context }) {
        return render(
            <App context={context}>
                <Add context={context}/>
            </App>
        );
    }

};