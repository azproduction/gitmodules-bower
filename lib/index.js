var ini = require('ini'),
    path = require('path');

/**
 *
 * @param {String} gitmodules content of .gitmodules ini file
 * @param {Object} [bowerrc] bower config
 * @param {String} [bowerrc.directory=''] bower base directory
 * @returns {Object} json in bower.json format
 */
module.exports = function (gitmodules, bowerrc) {
    bowerrc = bowerrc || {};
    var subModules = ini.parse(gitmodules);

    var dependencies = Object.keys(subModules).reduce(function (dependencies, moduleName) {
        var descriptor = subModules[moduleName],
            moduleId = path.relative(bowerrc.directory || '', descriptor.path);

        dependencies[moduleId] = descriptor.url + (descriptor.branch ? '#' + descriptor.branch : '');

        return dependencies;
    }, {});

    return {
        dependencies: dependencies
    };
};
