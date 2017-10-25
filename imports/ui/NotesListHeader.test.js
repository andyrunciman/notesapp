import React from 'react';
import expect from 'expect';
import {Meteor} from 'meteor/meteor'
import {mount} from 'enzyme';
import {NotesListHeader} from './NotesListHeader';
import {notes} from '../fixtures/fixtures';


if(Meteor.isClient){
  describe("Notes List Header",function(){
    let meteorCall;
    let Session;

    beforeEach(function(){
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      }
    });

    it('should call the update note method when the add note button is pressed',function(){
      const wrapper = mount(<NotesListHeader meteorCall={meteorCall} Session={Session}/>);
      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined,notes[0]._id);
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId',notes[0]._id);
    });
    it('should not set session for failed insert',function(){
      const wrapper = mount(<NotesListHeader meteorCall={meteorCall} Session={Session}/>);
      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({err:101},undefined);
      expect(Session.set).toNotHaveBeenCalled();


    });

    //it should not set session for failed insert
  });
}
