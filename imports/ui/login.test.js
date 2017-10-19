import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Login} from './Login';

if (Meteor.isClient){
  describe('Login',function(){
    it('should show error messages',function(){
      const error = "This is not working";
      const wrapper = mount(<Login loginWithPassword={()=>{}}/>);
      wrapper.setState({error}); //prop shorthand
      expect(wrapper.find('p').text()).toBe(error);
      wrapper.setState({error:''});
      expect(wrapper.find('p').length).toBe(0);
    });
    it('should call loginWithPassword with the form data',function(){
      const email = "andrew@test.com";
      const password = "password123";
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);
      wrapper.ref('email').node.value  = email;  //return a new wrapper! Converts wrapper to js node (in this case it is a htmlinoutelement)
      wrapper.ref('password').node.value  = password;
      wrapper.find('form').simulate('submit');
      expect(spy.calls[0].arguments[0]).toEqual({email}); //not use to have been called with as we are not intereted in all of the properties and we would need to know them all
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should call loginWithPassword callback errors',function(){
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);
      wrapper.find('form').simulate('submit');
      wrapper.setState({error:"oops"});
      expect(wrapper.state('error')).toNotBe(''); //even thought teh error is empty, it will only be empty if not error was passed (even)
    });

  });

}
