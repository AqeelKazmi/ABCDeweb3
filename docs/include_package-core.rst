

setProvider
=====================

.. code-block:: javascript

    ABCDeweb3.setProvider(myProvider)
    ABCDeweb3.eth.setProvider(myProvider)
    ABCDeweb3.shh.setProvider(myProvider)
    ABCDeweb3.bzz.setProvider(myProvider)
    ...

Will change the provider for its module.

.. note:: When called on the umbrella package ``ABCDeweb3`` it will also set the provider for all sub modules ``ABCDeweb3.eth``, ``ABCDeweb3.shh``, etc EXCEPT ``ABCDeweb3.bzz`` which needs a separate provider at all times.

----------
Parameters
----------

1. ``Object`` - ``myProvider``: :ref:`a valid provider <ABCDeweb3-providers>`.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    var ABCDeweb3 = require('ABCDeweb3');
    var ABCDeweb3 = new ABCDeWeb3('http://localhost:8545');
    // or
    var ABCDeweb3 = new ABCDeWeb3(new ABCDeWeb3.providers.HttpProvider('http://localhost:8545'));

    // change provider
    ABCDeweb3.setProvider('ws://localhost:8546');
    // or
    ABCDeweb3.setProvider(new ABCDeWeb3.providers.WebsocketProvider('ws://localhost:8546'));

    // Using the IPC provider in node.js
    var net = require('net');
    var ABCDeweb3 = new ABCDeWeb3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os path
    // or
    var ABCDeweb3 = new ABCDeWeb3(new ABCDeWeb3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\geth.ipc"
    // on linux the path is: "/users/myuser/.ethereum/geth.ipc"


------------------------------------------------------------------------------

providers
=====================

.. code-block:: javascript

    ABCDeweb3.providers
    ABCDeweb3.eth.providers
    ABCDeweb3.shh.providers
    ABCDeweb3.bzz.providers
    ...

Contains the current available :ref:`providers <ABCDeweb3-providers>`.

----------
Value
----------

``Object`` with the following providers:

    - ``Object`` - ``HttpProvider``: The HTTP provider is **deprecated**, as it won't work for subscriptions.
    - ``Object`` - ``WebsocketProvider``: The Websocket provider is the standard for usage in legacy browsers.
    - ``Object`` - ``IpcProvider``: The IPC provider is used node.js dapps when running a local node. Gives the most secure connection.

-------
Example
-------

.. code-block:: javascript

    var ABCDeWeb3 = require('ABCDeweb3');
    // use the given Provider, e.g in Mist, or instantiate a new websocket provider
    var ABCDeweb3 = new ABCDeWeb3(ABCDeWeb3.givenProvider || 'ws://remotenode.com:8546');
    // or
    var ABCDeweb3 = new ABCDeWeb3(ABCDeWeb3.givenProvider || new ABCDeWeb3.providers.WebsocketProvider('ws://remotenode.com:8546'));

    // Using the IPC provider in node.js
    var net = require('net');

    var ABCDeweb3 = new ABCDeWeb3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os path
    // or
    var ABCDeweb3 = new ABCDeWeb3(new ABCDeWeb3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)); // mac os path
    // on windows the path is: "\\\\.\\pipe\\geth.ipc"
    // on linux the path is: "/users/myuser/.ethereum/geth.ipc"


------------------------------------------------------------------------------

givenProvider
=====================

.. code-block:: javascript

    ABCDeweb3.givenProvider
    ABCDeweb3.eth.givenProvider
    ABCDeweb3.shh.givenProvider
    ABCDeweb3.bzz.givenProvider
    ...

When using ABCDeweb3.js in an Ethereum compatible browser, it will set with the current native provider by that browser.
Will return the given provider by the (browser) environment, otherwise ``null``.


-------
Returns
-------

``Object``: The given provider set or ``null``;

-------
Example
-------

.. code-block:: javascript
    ABCDeweb3.setProvider(ABCDeweb3.givenProvider || "ws://remotenode.com:8546");

------------------------------------------------------------------------------


currentProvider
=====================

.. code-block:: javascript

    ABCDeweb3.currentProvider
    ABCDeweb3.eth.currentProvider
    ABCDeweb3.shh.currentProvider
    ABCDeweb3.bzz.currentProvider
    ...

Will return the current provider, otherwise ``null``.


-------
Returns
-------

``Object``: The current provider set or ``null``;

-------
Example
-------

.. code-block:: javascript
    if(!ABCDeweb3.currentProvider) {
        ABCDeweb3.setProvider("http://localhost:8545");
    }

------------------------------------------------------------------------------

BatchRequest
=====================

.. code-block:: javascript

    new ABCDeweb3.BatchRequest()
    new ABCDeweb3.eth.BatchRequest()
    new ABCDeweb3.shh.BatchRequest()
    new ABCDeweb3.bzz.BatchRequest()

Class to create and execute batch requests.

----------
Parameters
----------

none

-------
Returns
-------

``Object``: With the following methods:

    - ``add(request)``: To add a request object to the batch call.
    - ``execute()``: Will execute the batch request.

-------
Example
-------

.. code-block:: javascript

    var contract = new ABCDeweb3.eth.Contract(abi, address);

    var batch = new ABCDeweb3.BatchRequest();
    batch.add(ABCDeweb3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
    batch.add(contract.methods.balance(address).call.request({from: '0x0000000000000000000000000000000000000000'}, callback2));
    batch.execute();


------------------------------------------------------------------------------

extend
=====================

.. code-block:: javascript

    ABCDeweb3.extend(methods)
    ABCDeweb3.eth.extend(methods)
    ABCDeweb3.shh.extend(methods)
    ABCDeweb3.bzz.extend(methods)
    ...

Allows extending the ABCDeweb3 modules.

.. note:: You also have ``*.extend.formatters`` as additional formatter functions to be used for in and output formatting. Please see the `source file <https://github.com/ethereum/ABCDeweb3.js/blob/master/packages/ABCDeweb3-core-helpers/src/formatters.js>`_ for function details.

----------
Parameters
----------

1. ``methods`` - ``Object``: Extension object with array of methods description objects as follows:
    - ``property`` - ``String``: (optional) The name of the property to add to the module. If no property is set it will be added to the module directly.
    - ``methods`` - ``Array``: The array of method descriptions:
        - ``name`` - ``String``: Name of the method to add.
        - ``call`` - ``String``: The RPC method name.
        - ``params`` - ``Number``: (optional) The number of parameters for that function. Default 0.
        - ``inputFormatter`` - ``Array``: (optional) Array of inputformatter functions. Each array item responds to a function parameter, so if you want some parameters not to be formatted, add a ``null`` instead.
        - ``outputFormatter - ``Function``: (optional) Can be used to format the output of the method.


----------
Returns
----------

``Object``: The extended module.

-------
Example
-------

.. code-block:: javascript

    ABCDeweb3.extend({
        property: 'myModule',
        methods: [{
            name: 'getBalance',
            call: 'eth_getBalance',
            params: 2,
            inputFormatter: [ABCDeweb3.extend.formatters.inputAddressFormatter, ABCDeweb3.extend.formatters.inputDefaultBlockNumberFormatter],
            outputFormatter: ABCDeweb3.utils.hexToNumberString
        },{
            name: 'getGasPriceSuperFunction',
            call: 'eth_gasPriceSuper',
            params: 2,
            inputFormatter: [null, ABCDeweb3.utils.numberToHex]
        }]
    });

    ABCDeweb3.extend({
        methods: [{
            name: 'directCall',
            call: 'eth_callForFun',
        }]
    });

    console.log(ABCDeweb3);
    > ABCDeWeb3 {
        myModule: {
            getBalance: function(){},
            getGasPriceSuperFunction: function(){}
        },
        directCall: function(){},
        eth: Eth {...},
        bzz: Bzz {...},
        ...
    }


------------------------------------------------------------------------------
