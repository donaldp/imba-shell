# Imba Shell

Interactive debugger and REPL for Imba.

![imba-shell](https://raw.githubusercontent.com/donaldp/imba-shell/main/shell.gif)

## Install

npm:

```bash
npm i -g imba-shell
```

yarn:

```bash
yarn global add imba-shell
```

## Usage

To start using `imba-shell`, run the following command:

```bash
imba-shell
```

> Note, you can also use `imbas` instead of `imba-shell`.

### Multiline

To use multi-line mode, use the .editor command:

```bash
>>> .editor
```

This will open a multi-line editor.

> Note, to insert tabs, use `Shift+Tab`.

### Clear

To clear the `imba-shell`, use the `clear` helper:

```bash
>>> clear!
```

> You can also use the `.clear` command.

### Exit

To exit out of `imba-shell`, use the `exit` helper:

```bash
>>> exit!
```

> You can also use the `.exit` command.

## Programmable API

`imba-shell` can also be used as a module. Here's an example:

Imba:

```py
import { ImbaRepl } from 'imba-shell'

const repl = new ImbaRepl 'imba> '

repl.run!
```

JavaScript:

```js
const { ImbaRepl } = require('imba-shell');

const repl = new ImbaRepl('imba> ');

repl.run();
```

> Note, you can pass an object of [Node.js repl](https://nodejs.org/api/repl.html#repl_repl_start_options) options in the `run` function.

### History

Here's an example of how to enable the history feature:

Imba:

```py
import { ImbaRepl } from 'imba-shell'
import os from 'os'
import path from 'path'

const repl = new ImbaRepl 'imba> ', path.join(os.homedir!, '.my_repl_history')

repl.run!
```

JavaScript:

```js
const { ImbaRepl } = require('imba-shell');
const os = require('os');
const path = require('path');

const repl = new ImbaRepl('imba> ', path.join(os.homedir(), '.my_repl_history'));

repl.run();
```

> You can set any valid path as your history file.

### Commands

You can register commands with the `registerCommand` function:

Imba:

```py
repl.registerCommand 'goodbye', do
	console.log 'Goodbye!'
	this.close!

```

JavaScript:

```py
repl.registerCommand('goodbye', () => {
	console.log('Goodbye!');
	this.close();
});

```

### Context

You may register functions and properties to be available in the REPL using the `registerCallback` function:

Imba:

```py
const repl = new ImbaRepl

repl.registerCallback do(ctx)
	ctx.foo = 'bar'
```

JavaScript:

```js
const repl = new ImbaRepl();

repl.registerCallback((ctx) => {
	ctx.foo = 'bar'
})
```

When calling `foo` in the REPL, it will return `bar`.

Todo
-------

- &#9745; Code completion.
- &#9745; Multiline Editor.
- &#9745; Async/Await.
- &#9745; Extensible API.
- &#9746; Syntax highlighting.
- &#9746; Imba Compile Errors.

Security
-------

If you discover any security related issues, please email donaldpakkies@gmail.com instead of using the issue tracker.

License
-------

The MIT License (MIT). Please see [License File](LICENSE) for more information.
