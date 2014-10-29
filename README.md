ABONDONED - use [IOKI/restler-bluebird](https://github.com/IOKI/restler-bluebird)

restler-bluebird
=========

Based on Andrew Newdigate [reslter-q](https://github.com/troupe/restler-q)



Installing
-----------------

    npm install tiriana/restler-bluebird --save


Using
-----------------

The interface is similar to Restler's interface:

    var rest = require('restler-bluebird');

    rest.get('https://api.github.com/orgs/Troupe/repos')
      .then(function(repos) {
        assert(Array.isArray(repos));
      })
      .nodeify(done);

Running the tests
-----------------

    npm install
    make test
