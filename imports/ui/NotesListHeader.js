import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
//import {Notes} from '../api/notes';
import PropTypes from 'prop-types';

//NotesListHeader
export const NotesListHeader = (props) => {
  // const addNote = function(){
  //   props.meteorCall('notes.insert');
  // }
  //<button onClick={addNote} >Add Note</button>
  return (
    <div>
      <button onClick={() => props.meteorCall('notes.insert',(err,res)=>{
            if(res){
              props.Session.set('selectedNoteId',res);
            }
      })}>Add Note</button>
    </div>
  );
};

NotesListHeader.propTypes = {
  meteorCall:PropTypes.func.isRequired,
  Session:PropTypes.object.isRequired
}

export default createContainer(()=>{
  //wraps in an autorun
  return{
    meteorCall:Meteor.call,
    Session
  };
},NotesListHeader);
