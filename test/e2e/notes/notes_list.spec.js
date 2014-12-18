'use strict';

var cp   = require('child_process'),
    h    = require('../../helpers/helpers'),
    path = require('path'),
    db   = h.getdb();

describe('login', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      login();
      done();
    });
  });

  it('should get the notes page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('notes');
  });

  it('should create a new note', function(){
    create('a', 'b', 'c,d,e');

    expect(element(by.model('note.title')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.body')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.tags')).getAttribute('value')).toEqual('');
    expect(element.all(by.repeater('note in notes')).count()).toBeGreaterThan(0);
  });

  it('should go to note detail', function(){
    create('x', 'y', 'z,aa,bb');

    element(by.repeater('note in notes').row(0)).element(by.css('td:nth-child(2) > a')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('x');
  });
});

function create(title, body, tags){
  var image = path.resolve(__dirname, '../../fixtures/flag.png');
    element(by.model('note.title')).sendKeys(title);
    element(by.model('note.body')).sendKeys(body);
    element(by.model('note.tags')).sendKeys(tags);
    element(by.css('input[type="file"]')).sendKeys(image);
    element(by.css('button[ng-click]')).click();
}

function login(){
  browser.get('/#/login');
  element(by.model('user.username')).sendKeys('bob');
  element(by.model('user.password')).sendKeys('123');
  element(by.css('button[ng-click]')).click();
  browser.get('/#/notes');
}
