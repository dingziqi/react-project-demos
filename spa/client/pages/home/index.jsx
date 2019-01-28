import React from 'react';
import { hot } from 'react-hot-loader';
import Page from '~components/layout/page';
import './index.less';

class Home extends Page {
  render() {
    return (
      <div className="page-home">
        <h1>this is home page.1</h1>
        <input />
      </div>
    );
  }
}

// export default Home;
export default hot(module)(Home);
