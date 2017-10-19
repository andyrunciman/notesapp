import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Notes} from '../api/notes';
import NotesListHeader from './NotesListHeader';
import NotesListItem from './NotesListItem';
import PropTypes from 'prop-types';
import NotesListEmptyItem from './NotesListEmptyItem';

export const NotesList = (props) => {
  const renderList = function(){
    return props.notes.map((note)=>{
      return (<NotesListItem key={note._id} note={note} />);
    });
  };
  return (
    <div>
      <NotesListHeader/>
      {props.notes.length === 0? <NotesListEmptyItem/> : undefined}
      {renderList()}
    </div>
  );
};

NotesList.propTypes = {
  notes:PropTypes.array.isRequired
}

export default createContainer(()=>{
  ///fetch the Notes
  //Subscribe to notes that we made in the sever
  Meteor.subscribe('notes');
  return {
    notes:Notes.find().fetch()  //all notes that this user has access to
    //.fetch() gets a cursor to the array
  }
  //return adds notes to the props of the Noteslist!

},NotesList);
