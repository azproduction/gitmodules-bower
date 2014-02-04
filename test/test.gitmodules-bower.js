/*global describe, it, beforeEach, afterEach*/
/*jshint expr:true*/

var bowerify = require('..'),
    fs = require('fs'),
    expect = require('chai').expect;

var gitmodules = fs.readFileSync(__dirname + '/fixtures/gitmodules.ini', 'utf8'),
    bowerrc = require(__dirname + '/fixtures/bowerrc.json');

describe('gitmodules-bower', function() {
    it('prints only `dependencies` property in result json', function() {
        var bowerJson = bowerify(gitmodules);

        expect(bowerJson).to.have.keys(['dependencies']);
    });

    it('prints dependencies in "path": "url" format', function() {
        var bowerJson = bowerify(gitmodules);

        expect(bowerJson).to.have.deep.property('dependencies.static/services-bh', 'git://github.com/bem/services-bh.git');
    });

    it('appends `branch` to `url` in url#branch format', function() {
        var bowerJson = bowerify(gitmodules);

        expect(bowerJson).to.have.deep.property('dependencies.static/bem-bl', 'git://github.com/bem/bem-bl.git#0.3');
        expect(bowerJson).to.have.deep.property('dependencies.static/bem-bl-bh', 'git://github.com/bem/bem-bl-bh.git#master');
    });

    it('resolves module name relatively to `bowerrc.directory` property', function() {
        var bowerJson = bowerify(gitmodules, bowerrc);

        expect(bowerJson).to.have.deep.property('dependencies.bem-bl', 'git://github.com/bem/bem-bl.git#0.3');
        expect(bowerJson).to.have.deep.property('dependencies.bem-bl-bh', 'git://github.com/bem/bem-bl-bh.git#master');
        expect(bowerJson).to.have.deep.property('dependencies.services-bh', 'git://github.com/bem/services-bh.git');
    });
});
