import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if(Meteor.isClient){
  describe('PrivateHeader',function(){
    it('should set button text to logout',function(){
      const wrapper = mount(<PrivateHeader title="Test title"/>);
      const buttonText = wrapper.find('.button').text();
      expect(buttonText).toBe('Logout');
    });
    it('should display the title prop',function(){
      const title = "Test Title";
      const wrapper = mount(<PrivateHeader title={title} handleLogout={()=>{}}/>);
      const headerTitle = wrapper.find('.header__title').text();
      expect(headerTitle).toBe(title);
    });
    //it('should call the function',function(){
      //const spy = expect.createSpy();
      //expect(spy).toHaveBeenCalled();
      //expect(spy).toNotHaveBeenCalled();
      //spy(3,4,123);
      //spy('Andrew');
      //expect(spy).toHaveBeenCalledWith('Andrew');
    //});
    it("should call handleLogout on click",function(){
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title="Title" handleLogout={spy}/>);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
      //expect(spy.calls.length).toBe(1);
    });
  });
}
