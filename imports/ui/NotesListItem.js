import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const NotesListItem = (props) =>{
  return (
    <div>
      <h5>{props.note.title || 'Untitled Note'}</h5>
      <p>{moment(props.note.updatedAt).format('DD/MM/YY')}</p>
    </div>
  );
}

NotesListItem.propTypes = {
  note:PropTypes.object.isRequired
}

export default NotesListItem;
