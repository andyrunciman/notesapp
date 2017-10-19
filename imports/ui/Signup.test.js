import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Signup} from './Signup';

if (Meteor.isClient){
  describe('Signup',function(){
    it('should show error messages',function(){
      const error = "This is not working";
      const wrapper = mount(<Signup createUser={()=>{}}/>);
      wrapper.setState({error}); //prop shorthand
      expect(wrapper.find('p').text()).toBe(error);
      wrapper.setState({error:''});
      expect(wrapper.find('p').length).toBe(0);
    });
    it('should call create user with the form data',function(){
      const email = "andrew@test.com";
      const password = "password123";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);
      wrapper.ref('email').node.value  = email;  //return a new wrapper! Converts wrapper to js node (in this case it is a htmlinoutelement)
      wrapper.ref('password').node.value  = password;
      wrapper.find('form').simulate('submit');
      expect(spy.calls[0].arguments[0]).toEqual({email,password}); //not use to have been called with as we are not intereted in all of the properties and we would need to know them all
      //expect(spy.calls[0].arguments[1]).toBe(password);
    });
    //
    it('should call create user callback errors',function(){
      const reason = "total failure!"
      const email = "andrew@test.com";
      const password = "passdsdsdsdsd";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);
      wrapper.ref('email').node.value  = email;  //return a new wrapper! Converts wrapper to js node (in this case it is a htmlinoutelement)
      wrapper.ref('password').node.value  = password;
      wrapper.find('form').simulate('submit');
      spy.calls[0].arguments[1]({reason});
      //console.log("state:" + wrapper.state('error'));
      expect(wrapper.state('error')).toBe(reason); //even thought teh error is empty, it will only be empty if not error was passed (even)
      //we also need to check that the form has the correct value



    });


    it('should reject a password less than 9 character long',function(){
      const email = "andrew@test.com";
      const password = "pass";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);
      wrapper.ref('email').node.value  = email;  //return a new wrapper! Converts wrapper to js node (in this case it is a htmlinoutelement)
      wrapper.ref('password').node.value  = password;
      wrapper.find('form').simulate('submit');
      expect(wrapper.state('error')).toNotBe(''); //even thought teh error is empty, it will only be empty if not error was passed (even)
      //expect(spy.calls[0].arguments[1]).toBe(password);
    });

  });

}
