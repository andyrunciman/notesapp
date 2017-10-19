import React from 'react';

import PrivateHeader from './PrivateHeader';
import NotesList from './NotesList';

export default () => {
  return (
    <div >
      <PrivateHeader title="Dashboard"/>
      <div className="wrapper">
        <NotesList></NotesList>
      </div>
    </div>
  );
};
