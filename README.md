**PREVIEW RELEASE** This is a beta preview release with breaking changes! The current stable version is 1.0.0-beta 

<img src="https://github.com/ethereum/web3.js/raw/1.0/web3js.jpg" width=200 />

# ABCDeweb3.js - ABCDe JavaScript API

[![Join the chat at https://gitter.im/ethereum/web3.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ethereum/web3.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![npm](https://img.shields.io/npm/dm/web3.svg)](https://www.npmjs.com/package/web3) [![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Stories in Ready][waffle-image]][waffle-url]

This is the ABCDeWeb3 [JavaScript API][docs]
which connects to the [Generic JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) spec.


You need to run a local or remote ABCDe node to use this library.

Please read the [documentation][docs] for more.

## Installation

### Node

```bash
npm install abcdeweb3@1.0.0-beta-21
```
## Usage

```js
// in node.js
var ABCDeWeb3 = require('abcdeweb3');

var ABCDeweb3 = new ABCDeWeb3('ws://localhost:8546');
console.log(ABCDeweb3);

```

Additionally you can set a provider using `ABCDeweb3.setProvider()` (e.g. WebsocketProvider)

```js
const ABCDeWeb3 = require('abcdeweb3');
const ABCDeweb3 = new ABCDeWeb3(new ABCDeWeb3.providers.HttpProvider('http://13.229.152.61:8501'));
```

There you go, now you can use it:

```js
ABCDeweb3.eth.getAccounts()
.then(console.log);
```

## Documentation

Documentation can be found at [read the docs][docs]


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
