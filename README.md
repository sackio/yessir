# yessir [![Build Status](https://secure.travis-ci.org/sackio/yessir.png?branch=master)](http://travis-ci.org/sackio/yessir)

Yessir soups up Node's [assert module](http://nodejs.org/api/assert.html) and plays nicely with [nodeunit](https://github.com/caolan/nodeunit), providing helpers to reduce unit test boilerplate.

## Getting Started
Install the module with: `npm install yessir`

```javascript
var Yessir = require('yessir');
Yessir.test = require('assert'); //defaults to assert, can easily be test for nodeunit
```

## Methods
* **testObj(obj, tests)** - Run tests on `obj`. `tests` is an `Object` where each key represents a test to be run on `obj`. `tests` accepts various keys (of deep properties) and values, including:
```javascript
{
  'key': 'john' //if key is a property of obj, test are run on the value of the property, otherwise value is treated as the object as a whole
, 'name': true //if value is a boolean, existence or non-existence of the property of object is tested
, 'name': /john/ //if value is a RegExp, obj.key is tested to see if it matches value
, 'name': function(value, key){ return 'john' === value; } //if value is a function, is it called with arguments of value and key, bound to obj
, 'name': [...] //if value is an array, each element is treated as a test
, 'name': anything //anything else is tested for deep equality with value
}
```

* **testCb(cb, tests, [ind])** - Returns a function that when called applies `tests` to `arguments` before invoking `cb` with no only arguments[ind] or no arguments if ind is undefined

## License
Copyright (c) 2014 Ben Sack
Licensed under the MIT license.
