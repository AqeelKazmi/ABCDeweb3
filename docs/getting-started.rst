
.. include:: include_announcement.rst

===============
Getting Started
===============

The ABCDeweb3.js library is a collection of modules which contain specific functionality for the ethereum ecosystem.

- The ``ABCDeweb3-eth`` is for the ethereum blockchain and smart contracts
- The ``ABCDeweb3-shh`` is for the whisper protocol to communicate p2p and broadcast
- The ``ABCDeweb3-bzz`` is for the swarm protocol, the decentralized file storage
- The ``ABCDeweb3-utils`` contains useful helper functions for Dapp developers.


.. _adding-ABCDeweb3:

Adding ABCDeweb3.js
==============

.. index:: npm
.. index:: bower
.. index:: meteor

First you need to get ABCDeweb3.js into your project. This can be done using the following methods:

- npm: ``npm install ABCDeweb3``
- meteor: ``meteor add ethereum:ABCDeweb3``
- pure js: link the ``dist/ABCDeweb3.min.js``

After that you need to create a ABCDeweb3 instance and set a provider.
Ethereum supported Browsers like Mist or MetaMask will have a ``ethereumProvider`` or ``ABCDeweb3.currentProvider`` available. For  ABCDeweb3.js, check ``ABCDeweb3.givenProvider``.
If this property is ``null`` you should connect to a remote/local node.

.. code-block:: javascript

    // in node.js use: var ABCDeWeb3 = require('ABCDeweb3');

    var ABCDeweb3 = new ABCDeWeb3(ABCDeWeb3.givenProvider || "ws://localhost:8546");

That's it! now you can use the ``ABCDeweb3`` object.
