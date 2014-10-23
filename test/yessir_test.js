'use strict';

var Yessir = require('../lib/yessir.js')
  , Async = require('async')
  , _ = require('underscore')
  , Belt = require('jsbelt')
;

exports['units'] = {
  setUp: function(done) {
    return done();
  },
  'tests': function(test) {
    Yessir.test = test;

    var obj = Belt.deepObj({
      'beatles': ['john', 'paul', 'george', 'ringo']
    , 'rushmore': 'teddy roosevelt'
    , 'quartet': 4
    , 'range': 'go'
    });

    var tests = {
      'all': function(obj, key){ return _.keys(obj).length === 4 && key === 'all'; }
    , 'beatles': function(val){ return _.find(val, function(v){ return v === 'paul'; }); }
    , 'quartet': 4
    , 'range': true
    , 'home': false
    , 'rushmore': /^teddy/
    };

    Yessir.testObj(obj, tests);

    Yessir.test = {'ok': function(pred){ return test.ok(!pred); }};

    tests = {
      'all': function(obj, key){ return _.keys(obj).length === 999 && key === 'all'; }
    , 'beatles': function(val){ return _.find(val, function(v){ return v === 'mick'; }); }
    , 'quartet': 434
    , 'range': false
    , 'home': true
    , 'rushmore': /teddy$/
    };

    Yessir.testObj(obj, tests);

    Yessir.test = test;

    tests = {
      '0': function(val){ return _.find(val, function(v){ return v === 'paul'; }); }
    , '1': /^teddy/
    , '2': 4
    , '3': true
    };

    return Async.waterfall([
      function(cb){
        return Yessir.testCb(cb, tests).apply(null, _.values(obj));
      }
    ], function(err){
      if (err) console.error(err);
      test.ok(!err);
      return test.done();
    });
  },
};
