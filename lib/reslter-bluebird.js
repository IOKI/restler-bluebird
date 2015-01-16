/* jshint node:true, unused:true */
"use strict";

var rest = require('restler');
var bluebird = require('bluebird');

function wrap(r) {
    var defer = bluebird.defer();

    r.on('success', function(result, response) {
        defer.resolve(result);
    });

    r.on('fail', function(result, response) {
        defer.reject(result);
    });

    r.on('error', function(err, response) {
        defer.reject(err);
    });

    r.on('timeout', function(ms) {
        defer.reject(new Error('Request timed out after ' + ms + ' ms'));
    });

    r.on('abort', function() {
        defer.reject(new Error('Operation aborted'));
    });

    return defer.promise;
}

function wrapMethod(method) {
    return function() {
        var request = method.apply(rest, arguments);
        return wrap(request);
    };
}

module.exports = ['get', 'post', 'put', 'del', 'head', 'patch', 'json', 'postJson', 'putJson'].reduce(function(memo, method) {
    var underlying = rest[method];
    if (underlying) {
        memo[method] = wrapMethod(underlying);
    }
    return memo;
}, {});