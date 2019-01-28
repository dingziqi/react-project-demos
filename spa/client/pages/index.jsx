import React from 'react';
import { Link } from 'react-router-dom';
import Page from '~components/layout/page';
import './index.less';

export default class Index extends Page {
  render() {
    return (
      <div className="page-index">
        <h1>
          this is a single page application route by react-router with hash.
        </h1>
        <input />
        <p>
          <Link to="/home">home</Link>
        </p>
      </div>
    );
  }
}
