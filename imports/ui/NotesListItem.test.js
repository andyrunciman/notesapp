import React from 'react';
import expect from 'expect';
import {Meteor} from 'meteor/meteor'
import {mount} from 'enzyme';
import NoteListItem from './NotesListItem';

if(Meteor.isClient){
  describe("Notes List Item",function(){
      it("should render title and time stamp",function(){
        const title = "my note";
        const updatedAt = 1508355450196; //18/10/17
        const wrapper = mount(<NoteListItem note = {{title,updatedAt}}/>);

        expect(wrapper.find('h5').text()).toBe(title);
        expect(wrapper.find('p').text()).toBe('18/10/17');
      });
      it("should set default title if no title set",function(){
        const title = '';
        const updatedAt = 1508355450196; //18/10/17
        const wrapper = mount(<NoteListItem note = {{title,updatedAt}}/>);
        expect(wrapper.find('h5').text()).toBe('Untitled Note');

      });
  });
};
