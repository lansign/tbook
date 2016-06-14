/**
 * Created by Guang on 16/6/14.
 */

import React, { PropTypes } from 'react';
import s from './Home.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function Header({title}){

    return(
        <div className={s.herder}>
            {title}
        </div>
    )
}

export default withStyles(s)(Header);
