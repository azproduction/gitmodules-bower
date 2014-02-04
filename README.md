# gitmodules-bower
[![NPM Version](https://badge.fury.io/js/gitmodules-bower.png)]
(https://npmjs.org/package/gitmodules-bower)

Translates .gitmodules into bower.json

## Installation

`gitmodules-bower` can be installed using `npm`:

```
npm install gitmodules-bower
```

## Example

```js
var bowerify = require('gitmodules-bower'),
    fs = require('fs');

var gitmodules = fs.readFileSync('./.gitmodules', 'utf8'),
    bowerrc = JSON.parse(fs.readFileSync('./.bowerrc', 'utf8')),
    bowerJson = bowerify(gitmodules, bowerrc);

fs.writeFileSync('./bower.json', JSON.stringify(bowerJson, null, 4));
```

Where .gitmodules

```ini
[submodule "static/bem-bl"]
	path = static/bem-bl
	url = git://github.com/bem/bem-bl.git
	branch = 0.3
[submodule "static/bem-bl-bh"]
	path = static/bem-bl-bh
	url = git://github.com/bem/bem-bl-bh.git
	branch = master
[submodule "static/services-bh"]
	path = static/services-bh
	url = git://github.com/bem/services-bh.git

```

Where .bowerrc

```js
{
    "directory": "static"
}
```

Result bower.json

```js
{
    dependencies: {
        'static/bem-bl': 'git://github.com/bem/bem-bl.git#0.3',
        'static/bem-bl-bh': 'git://github.com/bem/bem-bl-bh.git#master',
        'static/services-bh': 'git://github.com/bem/services-bh.git'
    }
}
```
