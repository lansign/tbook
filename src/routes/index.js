/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import contact from './contact';
import login from './login';
import content from './content';
import error from './error';
import articleList from './article'
import articleDetail from './article/Edit'
import articleEdit from './article/Detail'
import articleAdd from './article/Add/index'

export default {

    path: '/',

    children: [
        home,
        contact,
        login,
        content,
        error,
        articleList,
        articleEdit,
        articleDetail,
        articleAdd
    ],

  async action({ next, render, context }) {
    const component = await next();
      console.log("---action---")
      if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
