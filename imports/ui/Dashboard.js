import React from 'react';

import PrivateHeader from './PrivateHeader';

export default () => {
  return (
    <div >
      <PrivateHeader title="Dashboard"/>
      <div className="wrapper">
        Dashboard Page Content
      </div>
    </div>
  );
};
