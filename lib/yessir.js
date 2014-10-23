/*
 * yessir
 * https://github.com/sackio/yessir
 *
 * Copyright (c) 2014 Ben Sack
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore')
  , Belt = require('jsbelt')
  , Assert = require('assert')
;

exports['test'] = Assert;

exports['testObj'] = function(obj, ts){
  var tests = ts || {};

  var self = this;

  return _.each(tests, function(v, k){
    var p = Belt._get(obj, k);

    if (_.isBoolean(v)) return self.test.ok(v ? p : !p, k + ' does ' + (v ? '' : 'not ') + 'exist');

    var o = !_.isUndefined(p) ? p : obj
      , a = Belt.toArray(v);
    return _.each(a, function(_a){
      return _.isFunction(_a) ? self.test.ok(_a.apply(obj, [o, k, tests, self])
                                , (p ? k : JSON.stringify(obj, null, 2)) + ' does not pass ' + _a.toString())
            : ( _.isRegExp(_a) ? self.test.ok(Belt._call(o.toString(), 'match', _a)
                                 , (p ? k : JSON.stringify(obj, null, 2)) + ' does not match ' + _a.toString())
              : self.test.ok(Belt.deepEqual(_a, o)
                , (p ? k : JSON.stringify(obj, null, 2)) + ' does not equal ' + JSON.stringify(_a, null, 2)));
    });
  });
};

exports['testCb'] = function(cb, ts, ind){
  var self = this;
  return function(){
    self.testObj(arguments, ts);
    return Belt.cw(cb, ind).apply(this, arguments);
  };
};
