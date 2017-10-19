import React from 'react';
import expect from 'expect';
import {Meteor} from 'meteor/meteor'
import {mount} from 'enzyme';
import {NotesListHeader} from './NotesListHeader';

if(Meteor.isClient){
  describe("Notes List Header",function(){
    it('should call the update note method when the add note button is pressed',function(){
      const spy = expect.createSpy();
      const wrapper = mount(<NotesListHeader meteorCall={spy}/>);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalledWith('notes.insert');
    });
  });
}
