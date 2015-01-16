var assert = require('assert'),
    reslterBluebird = require('../index'),
    chai = require('chai'),
    expect = chai.expect,
    nock = require('nock');

describe('restler-bluebird', function() {

    var host = 'http://www.example.com',
        httpServerMock = nock(host);

    beforeEach(function() {
        nock.disableNetConnect();
    });

    afterEach(function() {
        nock.cleanAll();
        nock.enableNetConnect(/.*/);
    });

    describe('method', function() {
        describe('get', function() {
            it('should exist', function(done) {
                expect(reslterBluebird.get).to.be.instanceOf(Function);
                done();
            });

            it('should resolve correctly', function(done) {
                var endpoint = '/array',
                    array = [1, 2, 3];

                httpServerMock.get(endpoint).reply(200, array);
                reslterBluebird.get(host + endpoint)
                    .then(function(arr) {
                        expect(arr).to.eql(array);
                    })
                    .nodeify(done);
            });

            it('should fail correctly', function(done) {
                var endpoint = '/fail',
                    message = 'request failed';

                httpServerMock.get(endpoint).reply(404, new Error(message));
                reslterBluebird.get(host + endpoint)
                    .then(function() {
                        throw new Error('should not reach this point. Expected failure.');
                    })
                    .error(function(err) {
                        expect(err).not.to.be.instanceOf(Error);
                    })
                    .nodeify(done);
            });

            it('should handle errors correctly', function(done) {
                var endpoint = 'hostname_does_not_exist.11298371';

                nock.enableNetConnect(endpoint);

                reslterBluebird.get('https://' + endpoint)
                    .then(function() {
                        assert(false, 'Expected an error');
                    })
                    .error(function(err) {
                        expect(err).to.be.instanceOf(Error);
                        expect(err.code).to.be.equal('ENOTFOUND');
                    })
                    .nodeify(done);
            });

            it('should handle timeout', function(done) {
                var endpoint = '/timeout';

                httpServerMock.get(endpoint).delayConnection(50).reply(200);

                reslterBluebird.get(host + endpoint, {timeout: 15})
                    .then(function() {
                        throw new Error('should not reach this point. Expected failure.');
                    })
                    .error(function(err) {
                        expect(err).to.be.instanceOf(Error)
                    })
                    .nodeify(done);
            });
        });

        describe('post', function() {
            it('should exist', function(done) {
                expect(reslterBluebird.post).to.be.instanceOf(Function);
                done();
            });

            it('should resolve correctly', function(done) {
                var endpoint = '/endpoint',
                    array = [1, 2, 3];

                httpServerMock.post(endpoint).reply(200, array);
                reslterBluebird.post(host + endpoint)
                    .then(function(arr) {
                        expect(arr).to.eql(array);
                    })
                    .nodeify(done);
            });
        });

        describe('put', function() {
            it('should exist', function(done) {
                expect(reslterBluebird.post).to.be.instanceOf(Function);
                done();
            });

            it('should resolve correctly', function(done) {
                var endpoint = '/endpoint',
                    array = [1, 2, 3];

                httpServerMock.put(endpoint).reply(200, array);
                reslterBluebird.put(host + endpoint)
                    .then(function(arr) {
                        expect(arr).to.eql(array);
                    })
                    .nodeify(done);
            });
        });

        describe('del', function() {
            it('should exist', function(done) {
                expect(reslterBluebird.post).to.be.instanceOf(Function);
                done();
            });

            it('should resolve correctly', function(done) {
                var endpoint = '/endpoint',
                    message = 'deleted';

                httpServerMock.delete(endpoint).reply(200, message);
                reslterBluebird.del(host + endpoint)
                    .then(function(arr) {
                        expect(arr).to.eql(message);
                    })
                    .nodeify(done);
            });
        });

        describe('head', function() {
            it('should exist', function(done) {
                expect(reslterBluebird.post).to.be.instanceOf(Function);
                done();
            });

            it('should resolve correctly', function(done) {
                var endpoint = '/endpoint',
                    array = [1, 2, 3];

                httpServerMock.intercept(endpoint, 'HEAD').reply(200, array);
                reslterBluebird.head(host + endpoint)
                    .then(function(arr) {
                        expect(arr).to.eql(array);
                    })
                    .nodeify(done);
            });
        });

        describe('patch', function() {
            it('should exist', function(done) {
                expect(reslterBluebird.post).to.be.instanceOf(Function);
                done();
            });

            it('should resolve correctly', function(done) {
                var endpoint = '/endpoint-patch',
                    array = [1, 2, 3];

                httpServerMock.intercept(endpoint, 'PATCH').reply(200, array);
                reslterBluebird.patch(host + endpoint)
                    .then(function(arr) {
                        expect(arr).to.eql(array);
                    })
                    .nodeify(done);
            });
        });

        describe('json', function() {
            it('should exist', function(done) {
                expect(reslterBluebird.post).to.be.instanceOf(Function);
                done();
            });

            it('should resolve correctly', function(done) {
                var endpoint = '/json',
                    array = [1, 2, 3],
                    jsonHeaders = {'Content-Type': 'application/json'},
                    reqOptions = {reqheaders: jsonHeaders};

                httpServerMock
                    .intercept(endpoint, 'GET', array, reqOptions)
                    .reply(200, array);

                reslterBluebird.json(host + endpoint, array)
                    .then(function(arr) {
                        expect(arr).to.eql(array);
                    })
                    .nodeify(done);
            });
        });

        describe('postJson', function() {
            it('should exist', function(done) {
                expect(reslterBluebird.post).to.be.instanceOf(Function);
                done();
            });

            it('should resolve correctly', function(done) {
                var endpoint = '/post-json',
                    array = [1, 2, 3],
                    jsonHeaders = {'Content-Type': 'application/json'},
                    reqOptions = {reqheaders: jsonHeaders};

                httpServerMock
                    .intercept(endpoint, 'POST', array, reqOptions)
                    .reply(200, array);

                reslterBluebird.postJson(host + endpoint, array)
                    .then(function(arr) {
                        expect(arr).to.eql(array);
                    })
                    .nodeify(done);
            });
        });

        describe('putJson', function() {
            it('should exist', function(done) {
                expect(reslterBluebird.post).to.be.instanceOf(Function);
                done();
            });

            it('should resolve correctly', function(done) {
                var endpoint = '/put-json',
                    array = [1, 2, 3],
                    jsonHeaders = {'Content-Type': 'application/json'},
                    reqOptions = {reqheaders: jsonHeaders};

                httpServerMock
                    .intercept(endpoint, 'PUT', array, reqOptions)
                    .reply(200, array);


                reslterBluebird.putJson(host + endpoint, array)
                    .then(function(arr) {
                        expect(arr).to.eql(array);
                    })
                    .nodeify(done);
            });
        });

    });

});