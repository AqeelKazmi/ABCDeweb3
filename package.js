/* jshint ignore:start */
Package.describe({
    name: 'abcdeweb3:abcdeweb3',
    version: '1.0.0-beta',
    summary: 'ABCDe JavaScript API, middleware to talk to a ABCDe node over RPC',
    git: 'https://github.com/AqeelKazmi/ABCDeweb3',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

// Npm.depends({
//     "xmlhttprequest": "1.7.0"
// });


Package.onUse(function(api) {
    api.versionsFrom('1.0.3.2');

    api.addFiles('dist/abcdeweb3.js', ['client']); // 'server'
});

/* jshint ignore:end */
