'use strict';

describe('login', function(){
  beforeEach(function(){
    browser.get('/#/login');
  });

  it('should get login page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });

  it('should login user', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('123');
    element(by.css('button[ng-click]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
  });

  it('should not login user', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('1234');
    element(by.css('button[ng-click]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });
});
