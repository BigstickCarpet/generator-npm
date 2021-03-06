'use strict';

<% if (!options.env.browser) { -%>
var <%= project.camelCaseName %> = require('../../'),
    expect = require('chai').expect,
    sinon  = require('sinon');

<% } -%>
describe('<%= project.name %>', function() {
  it('should export the `sayHello` function', function(done) {
    expect(<%= project.camelCaseName %>.sayHello).to.be.a('function');
    done();
  });

  it('should return "hello, world!"', function(done) {
    expect(<%= project.camelCaseName %>.sayHello()).to.equal('hello, world!');
    done();
  });

  it('should return a mock response', function(done) {
    sinon.stub(<%= project.camelCaseName %>, 'sayHello').returns('hi there');
    expect(<%= project.camelCaseName %>.sayHello()).to.equal('hi there');
    <%= project.camelCaseName %>.sayHello.restore();
    done();
  });
});
