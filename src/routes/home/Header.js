/**
 * Created by Guang on 16/6/14.
 */

import React, { PropTypes } from 'react';

export default function Header({title}){

    return(
        <div style={{display: 'flex',
                      flex: 1,
                      height: 50,
                      backgroundColor: '#d94b40',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 20,
                      color: 'white'}}>
            {title}
        </div>
    )
}
