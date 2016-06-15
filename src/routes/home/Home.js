/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Header from './Header'
import CardWrapper from './Home.Card'

const title = 'React Starter Kit';

function Home({ books }, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
        <Header title="技术博客"/>

        <div className={s.container}>
            <ul className={s.news}>
              {books.map((item, index) => (
                <li key={index} className={s.newsItem}>
                    <CardWrapper book={item} />
                </li>
              ))}
            </ul>
      </div>
    </div>
  );
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
