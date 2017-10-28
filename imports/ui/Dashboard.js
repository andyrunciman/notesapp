import React from 'react';

import PrivateHeader from './PrivateHeader';
import NotesList from './NotesList';
import Editor from './Editor';

export default () => {
  return (
    <div >
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <div className="page-content__sidebar">
          <NotesList/>
        </div>
        <div className="page-content__main">
          <Editor/>
        </div>
      </div>
    </div>
  );
};
