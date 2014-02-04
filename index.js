module.exports = process.env.GITMODULES_BOWER_COVERAGE ?
    require('./lib-cov') :
    require('./lib');
