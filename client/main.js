import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import {routes,onAuthChange} from '../imports/routes/routes';
import {browserHistory} from 'react-router';
import '../imports/startup/simple-schema-configuration.js';


Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
  //console.log('authentication changed');
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange(isAuthenticated,currentPagePrivacy);

});

Tracker.autorun(()=>{
  //watch for a change in the session id and then updates the URL
  const selectedNoteId = Session.get('selectedNoteId');
  if(selectedNoteId){
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }

});

Meteor.startup(()=> {
  Session.set('selectedNoteId',undefined);
  ReactDOM.render(routes,document.getElementById('app'));
});
