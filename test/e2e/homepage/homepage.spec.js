'use strict';

// Test for the homepage route //

// Variables are globally defined. We defined browser and expect in .jshintrc //
describe('homepage', function(){
  it('should get the homepage', function(){
    browser.get('/');
    expect(browser.getTitle()).toEqual('NoteTaker');
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
  });
});
