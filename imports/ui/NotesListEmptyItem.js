import React from 'react';
//also export default NotesListEmptyItem = () => {} works just fine..
const NotesListEmptyItem = () => {
  return (
    <div>
      <h5>You have no notes</h5>
      <p>Please setup a note</p>
    </div>
  );
}

export default NotesListEmptyItem;
