window.process = {
    platform: "",
    cwd: function () {
        return '/';
    }
};

var bowerify = require('gitmodules-bower');

function $(sel) {
    return document.querySelector(sel);
}

setTimeout(function () {
    var gitconfig = $('#gitconfig'),
        bower = $('#bower'),
        bowerrc = $('#bowerrc'),
        translateButton = $('#translate');

    function translate() {
        try {
            bower.value = JSON.stringify(bowerify(gitconfig.value, JSON.parse(bowerrc.value || '{}')), null, 4);
        } catch (e) {
            console.log(e.stack);
        }
    }

    gitconfig.addEventListener('input', translate, false);
    bowerrc.addEventListener('input', translate, false);
    translateButton.addEventListener('click', translate, false);
}, 0);
