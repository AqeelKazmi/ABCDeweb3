**PREVIEW RELEASE** This is a beta preview release with breaking changes! The current stable version is 1.0.0-beta-22

<img src="https://github.com/ethereum/web3.js/raw/1.0/web3js.jpg" width=200 />

# ABCDeweb3.js - ABCDe JavaScript API

You need to run a local or remote ABCDe node to use this library.


## Installation

### Node

```bash
npm install abcdeweb3@1.0.0-beta-22
```

## Usage

```js
// in node.js
var ABCDeWeb3 = require('abcdeweb3');

var ABCDeweb3 = new ABCDeWeb3('ws://localhost:8546');
console.log(ABCDeweb3);

```

Additionally you can set a provider using `ABCDeweb3.providers.HttpProvider()`

```js
const ABCDeWeb3 = require('abcdeweb3');
const ABCDeweb3 = new ABCDeWeb3(new ABCDeWeb3.providers.HttpProvider('http://13.229.152.61:8501'));
```

There you go, now you can use it:

```js
ABCDeweb3.eth.getAccounts()
.then(console.log);
```

## Building

### Requirements

* [Node.js](https://nodejs.org)
* npm

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install abcde-unit@0.0.1
sudo npm install lerna bootstrap
```