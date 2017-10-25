import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';
import {Editor} from './Editor';
import {notes} from '../fixtures/fixtures';

if(Meteor.isClient){
  describe('Editor',function(){
    let browserHistory;
    let call;
    beforeEach(function(){
      call = expect.createSpy();
      browserHistory = {
        push:expect.createSpy()
      }
    });
    it('displays "pick or create note" if no note is available',function(){
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} note={undefined}/>);
      expect(wrapper.find('p').text()).toBe("Pick or create a note to get started");
    });
    it('displays "note not found" if note id is invalid',function(){
      const wrapper = mount(<Editor selectedNoteId={"abcdefg"}/>);
      expect(wrapper.find('p').text()).toBe("Note not found");
    });
    it('should remove note',function(){
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} note={notes[0]} selectedNoteId={notes[0]._id}/>);
      wrapper.find('button').simulate('click');
      expect(call).toHaveBeenCalledWith("notes.remove",notes[0]._id); //not use to have been called with as we are not intereted in all of the properties and we would need to know them all
      expect(browserHistory.push).toHaveBeenCalledWith("/dashboard"); //not use to have been called with as we are not intereted in all of the properties and we would need to know them all
    });
    it('should update the note body on textarea chnage',function(){
      const newBody = 'This is my new body text';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} note={notes[0]} selectedNoteId={notes[0]._id}/>);
      wrapper.find('textarea').simulate('change',{
        //becomes the event argument.
        target:{
          value:newBody
        }
      });
      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update',notes[0]._id,{body:newBody});
    });
    it('should update the note title on input chnage',function(){
      const newTitle = 'This is my new title';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} note={notes[0]} selectedNoteId={notes[0]._id}/>);
      wrapper.find('input').simulate('change',{
        //becomes the event argument.
        target:{
          value:newTitle
        }
      });
      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update',notes[0]._id,{title:newTitle});
    });
    if('should set state for new note',function(){
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);
      //set props - not a component just enzynme
      wrapper.setProps({
        selectedNoteId:notes[0]._id,
        note:notes[0]
      });
      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });
    if('should not set state if note prop is not provided',function(){
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);
      //set props - not a component just enzynme
      wrapper.setProps({
        selectedNoteId:notes[0]._id,
      });
      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });
  });
}
