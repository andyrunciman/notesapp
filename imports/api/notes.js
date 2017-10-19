import {mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer){
  Meteor.publish('notes',function(){
    return Notes.find({userId:this.userId}); //try changing notes....
  });
}

Meteor.methods({
  'notes.insert'(){
    if(!this.userId){
      throw new Meteor.Error('not-authorised');
    }
    return Notes.insert({
      title:'',
      body:'',
      userId:this.userId,
      updateAt: moment().valueOf() //new Date().getTime();
    })
  },
  'notes.remove'(_id){
    if(!this.userId){
      throw new Meteor.Error('not-authorised');
    }
    //Simple schema to check id is a length > 1
    new SimpleSchema({
      _id:{
        type:String,
        min:1
      }
    }).validate({_id});
    //import simple schema
    Notes.remove({_id, userId:this.userId});
  },
  'notes.update'(_id,updates){
    if(!this.userId){
      throw new Meteor.Error('not-authorised');
    }
    new SimpleSchema({
      _id:{
        type:String,
        min:1
      },
      title:{
        type:String,
        optional:true
      },
      body:{
        type:String,
        optional:true
      }
    }).validate({
      _id,
      ...updates //any additional attributes will throw an error
    });

    Notes.update({
      _id,
      userId:this.userId
    },{
      $set:{
        updatedAt:moment().valueOf(),
        ...updates //no bad stuff as we have checked it via simpleschema
      }
    });
  }
});
