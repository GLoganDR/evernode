/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
    fs         = require('fs'),
    Note       = require('../../server/models/note'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    db         = h.getdb();

describe('Note', function(){
  var noteId;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      Note.create({id:1}, {title:'a', body:'b', tags:'c,d,e'}, function(err, results){
        noteId = results;
        done();
      });
    });
  });

  describe('constructor', function(){
    it('should make a Note object', function(done){
      var note = new Note();
      expect(note).to.be.instanceof(Note);
      done();
    });
  });

  describe('.upload', function(){
    it('should upload an image', function(done){
      var file = fs.createReadStream(__dirname + '/../fixtures/flag.png');
      Note.upload({token:'tok'}, file, 'flag.png', noteId, function(err, results){
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.uploadmobile', function(){
    it('should upload a b64 encoded image', function(done){
      Note.uploadmobile({token:'tok'}, 'b64image', noteId, function(err, results){
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a note', function(done){
      Note.create({id:1}, {title:'a',body:'b',tags:'c,d,e'}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.above(0);
        done();
      });
    });
  });
    it('should NOT create a new note - no user', function(done){
      var note = {title:'note', body:'this is a note', tags:'tag1, tag2, tag3'};
      Note.create({id:null}, note, function(err, userId){
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a new note - no title', function(done){
      var note = {title:null, body:'this is a note', tags:'tag1, tag2, tag3'};
      Note.create({id:1}, note, function(err, userId){
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a new note - no body', function(done){
      var note = {title:'note', body:null, tags:'tag1, tag2, tag3'};
      Note.create({id:1}, note, function(err, userId){
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a new note - no tags', function(done){
      var note = {title:'note', body:'this is a note', tags:null};
      Note.create({id:1}, note, function(err, userId){
        expect(err).to.be.ok;
        done();
      });
    });

  describe('.show', function(){
    it('should show a note', function(done){
      Note.show({id:1}, noteId, function(err, results){
        expect(err).to.be.null;
        expect(results.title).to.equal('a');
        done();
      });
    });
  });

  describe('.nuke', function(){
    it('should nuke a note', function(done){
      Note.nuke({id:1}, noteId, function(err, results){
        expect(err).to.be.null;
        expect(results).to.equal(noteId);
        done();
      });
    });
  });

  describe('.count', function(){
    it('should count notes from a user', function(done){
      Note.count({id:1}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.equal('1');
        done();
      });
    });
  });

  describe('.query', function(){
    it('should query notes from a user', function(done){
      Note.query({id:1}, {}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(1);
        done();
      });
    });
  });
});
