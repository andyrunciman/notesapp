import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import {NotesList} from './NotesList';

const notes = [
  {
    _id:'noteId1',
    title:'Test Title',
    body:'',
    updatedAt:0,
    userId:'userId1'
  },
  {
    _id:'noteId2',
    title:'',
    body:'Somthing is here',
    updatedAt:0,
    userId:'userId2'
  }
]

if(Meteor.isClient){
  describe('NotesList',function(){
    it('should render NotesListItem for each note',function(){
      const wrapper = mount(<NotesList notes={notes}/>);
      expect(wrapper.find('NotesListItem').length).toBe(2);
      expect(wrapper.find('NotesListEmptyItem').length).toBe(0);
    });
    it('should render NotesListEmptyItem if zero notes',function(){
      const wrapper = mount(<NotesList notes={[]}/>);
      expect(wrapper.find('NotesListItem').length).toBe(0);
      expect(wrapper.find('NotesListEmptyItem').length).toBe(1);
    });
  });

}
