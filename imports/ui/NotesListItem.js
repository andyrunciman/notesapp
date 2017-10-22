import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';

export const NotesListItem = (props) =>{
  return (
    <div onClick={()=>{
      props.Session.set('selectedNoteId',props.note._id);
    }}>
      <h5>{props.note.title || 'Untitled Note'}</h5>
      {props.note.selected ? 'selected':undefined}
      <p>{moment(props.note.updatedAt).format('DD/MM/YY')}</p>
    </div>
  );
}

NotesListItem.propTypes = {
  note:PropTypes.object.isRequired,
  Session:PropTypes.object.isRequired
}

export default createContainer(()=>{
  return{
    Session
  }
},NotesListItem)
