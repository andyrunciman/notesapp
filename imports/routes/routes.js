import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import { Router, Route, browserHistory} from 'react-router';

const unauthenticatedPages = ['/','/signup'];
const authenticatedPage = ['/dashboard'];
const onEnterPublicPage = () => {
  if(Meteor.userId()){
    browserHistory.replace('/dashboard');
  }
};
export const onAuthChange = (isAuthenticated) => {

  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPage.includes(pathname);

  if(isAuthenticated && isUnauthenticatedPage){
    browserHistory.replace('/dashboard');
  }else if(isAuthenticatedPage && !isAuthenticated){
    browserHistory.replace('/');
  }
};
export const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }
};
export const routes = (
  <Router history={browserHistory}>
      <Route path="/" exact component={Login} onEnter={onEnterPublicPage}/>
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
      <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
      <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterPrivatePage}/>
      <Route path = "*" component={NotFound}/>
  </Router>

);
