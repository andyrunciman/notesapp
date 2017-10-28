import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Notes} from '../api/notes';
import NotesListHeader from './NotesListHeader';
import NotesListItem from './NotesListItem';
import PropTypes from 'prop-types';
import NotesListEmptyItem from './NotesListEmptyItem';
import {Session} from 'meteor/session';


export const NotesList = (props) => {
  const renderList = function(){
    return props.notes.map((note)=>{
      return (<NotesListItem key={note._id} note={note} />);
    });
  };
  return (
    <div className="item-list">
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
  const selectedNoteId = Session.get('selectedNoteId'); //this is the same as autorun so will detect chnagd
  Meteor.subscribe('notes');
  return {
    notes:Notes.find({},{sort:{updatedAt:-1}}).fetch().map((note)=>{
      return {
        ...note,
        selected:note._id===selectedNoteId
      }
    })
  //all notes that this user has access to
    //.fetch() gets a cursor to the array
  }
  //return adds notes to the props of the Noteslist!

},NotesList);

//
// if(note._id === selectedNoteId){
//   note.selected = true;
//   return note;
// }else{
//   note.selected = false;
//   return note;
// }
