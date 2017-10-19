import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {Notes} from './notes';

if(Meteor.isServer){
  describe('notes',function(){
    const noteOne = {
      _id:'testNoteId1',
      title:'My Title',
      body:'My body for note',
      updatedAt:0,
      userId:'testUserId1'
    };
    const noteTwo = {
      _id:'testNoteId2',
      title:'Things to buy',
      body:'Couch',
      updatedAt:0,
      userId:'testUserId2'
    };

    beforeEach(function(){
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });
    //also aftereach

    it('should insert new note',function(){
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
      expect(Notes.findOne({_id,userId})).toExist();
    });
    it('should not insert note if not authenticated',function(){
      //expect(()=>{Meteor.server.method_handlers['notes.insert']()}).toThrow();
      //TRIED CALL - THIS WORKS BUT YOU CANT BIND.
      expect(()=>{Meteor.call('notes.insert')}).toThrow();
    });
    it('should remove note',function(){
      //call remove methods
      Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId},[noteOne._id]);
      expect(Notes.findOne({_id:'testNoteId1'})).toNotExist();
    });
    it('should not remove note if unauthenticated',function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({},[noteOne._id]);
      }).toThrow();
    });
    it('should not remove note if invalid _id',function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId});
      }).toThrow();
    });
    it('should update note',function(){
      const title = "This is an updated title";
      Meteor.server.method_handlers['notes.update'].apply({userId:noteOne.userId},[noteOne._id,{title}]);
      const note = Notes.findOne(noteOne._id);
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body:noteOne.body
      });
    });
    it('should not accept additional attributes when updating',function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({userId:noteOne.userId},[noteOne._id,{name:"Andrew"}])
      }).toThrow();
    });
    //it should throw an error if there are extra updates
    //expect some function to throw
    it('should not update note if the note was not the creator',function(){
      const title = "This is an updated title";
      Meteor.server.method_handlers['notes.update'].apply({
        userId:'testid'},[
          noteOne._id,
          {title}
        ]);
      const note = Notes.findOne(noteOne._id);
      expect(note).toInclude(noteOne);
    });

    it('should not be able to update a note if unauthenticated',function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({},[noteOne._id,{title:'updated without being logged in...hahahahahah'}]);
      }).toThrow();
    });
    it('should not be able to update a note if provided an invalid id',function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({userId:noteOne.userId},[_id:'notethatisntthere',{title:'updating text'}]);
      }).toThrow();
    });

    it('should return a users notes',function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId:noteOne.userId});
      const notes = res.fetch();
      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });
    it('should return 0 notes for user that has no notes',function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId:'funckmaster'});
      const notes = res.fetch();
      expect(notes.length).toBe(0);
    });

  });
}
