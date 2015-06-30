'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('DatChat App', function() {

  it('should redirect / to #/chat', function() {
    browser.get('/');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('#/chat');
      });
  });


  // describe('Phone list view', function() {

  //   beforeEach(function() {
  //     browser.get('app/index.html#/phones');
  //   });


  //   it('should filter the phone list as a user types into the search box', function() {

  //     var phoneList = element.all(by.repeater('phone in phones'));
  //     var query = element(by.model('query'));

  //     expect(phoneList.count()).toBe(20);

  //     query.sendKeys('nexus');
  //     expect(phoneList.count()).toBe(1);

  //     query.clear();
  //     query.sendKeys('motorola');
  //     expect(phoneList.count()).toBe(8);
  //   });
  });
});
