#!/usr/bin/env node

'use strict';

var lernaJSON = require('./lerna.json');
var path = require('path');

var del = require('del');
var gulp = require('gulp');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var exorcist = require('exorcist');
var bower = require('bower');
var streamify = require('gulp-streamify');
var replace = require('gulp-replace');
var exec = require('child_process').exec;

var DEST = path.join(__dirname, 'dist/');

var packages = [{
    fileName: 'ABCDeweb3',
    expose: 'ABCDeWeb3',
    src: './packages/ABCDeweb3/src/index.js',
    ignore: ['xmlhttprequest', 'websocket']
}, {
    fileName: 'ABCDeweb3-utils',
    expose: 'ABCDeWeb3Utils',
    src: './packages/ABCDeweb3-utils/src/index.js'
}, {
    fileName: 'ABCDeweb3-eth',
    expose: 'ABCDeWeb3Eth',
    src: './packages/ABCDeweb3-eth/src/index.js'
}, {
    fileName: 'ABCDeweb3-eth-accounts',
    expose: 'ABCDeWeb3EthAccounts',
    src: './packages/ABCDeweb3-eth-accounts/src/index.js'
}, {
    fileName: 'ABCDeweb3-eth-contract',
    expose: 'ABCDeWeb3EthContract',
    src: './packages/ABCDeweb3-eth-contract/src/index.js'
}, {
    fileName: 'ABCDeweb3-eth-personal',
    expose: 'ABCDeWeb3EthPersonal',
    src: './packages/ABCDeweb3-eth-personal/src/index.js'
}, {
    fileName: 'ABCDeweb3-eth-iban',
    expose: 'ABCDeWeb3EthIban',
    src: './packages/ABCDeweb3-eth-iban/src/index.js'
}, {
    fileName: 'ABCDeweb3-eth-abi',
    expose: 'ABCDeWeb3EthAbi',
    src: './packages/ABCDeweb3-eth-abi/src/index.js'
}, {
    fileName: 'ABCDeweb3-net',
    expose: 'ABCDeWeb3Net',
    src: './packages/ABCDeweb3-net/src/index.js'
}, {
    fileName: 'ABCDeweb3-shh',
    expose: 'ABCDeWeb3Shh',
    src: './packages/ABCDeweb3-shh/src/index.js'
}, {
    fileName: 'ABCDeweb3-bzz',
    expose: 'ABCDeWeb3Bzz',
    src: './packages/ABCDeweb3-bzz/src/index.js'
}, {
    fileName: 'ABCDeweb3-providers-ipc',
    expose: 'ABCDeWeb3IpcProvider',
    src: './packages/ABCDeweb3-providers-ipc/src/index.js'
}, {
    fileName: 'ABCDeweb3-providers-http',
    expose: 'ABCDeWeb3HttpProvider',
    src: './packages/ABCDeweb3-providers-http/src/index.js',
    ignore: ['xmlhttprequest']
}, {
    fileName: 'ABCDeweb3-providers-ws',
    expose: 'ABCDeWeb3WsProvider',
    src: './packages/ABCDeweb3-providers-ws/src/index.js',
    ignore: ['websocket']
}, {
    fileName: 'ABCDeweb3-core-subscriptions',
    expose: 'ABCDeWeb3Subscriptions',
    src: './packages/ABCDeweb3-core-subscriptions/src/index.js'
}, {
    fileName: 'ABCDeweb3-core-requestmanager',
    expose: 'ABCDeWeb3RequestManager',
    src: './packages/ABCDeweb3-core-requestmanager/src/index.js'
}, {
    fileName: 'ABCDeweb3-core-promievent',
    expose: 'ABCDeWeb3PromiEvent',
    src: './packages/ABCDeweb3-core-promievent/src/index.js'
}, {
    fileName: 'ABCDeweb3-core-method',
    expose: 'ABCDeWeb3Method',
    src: './packages/ABCDeweb3-core-method/src/index.js'
}];

var browserifyOptions = {
    debug: true,
    // standalone: 'ABCDeWeb3',
    derequire: true,
    insertGlobalVars: false, // jshint ignore:line
    detectGlobals: true,
    bundleExternal: true
};

var ugliyOptions = {
    compress: {
        dead_code: true,  // jshint ignore:line
        drop_debugger: true,  // jshint ignore:line
        global_defs: {      // jshint ignore:line
            "DEBUG": false      // matters for some libraries
        }
    }
};

gulp.task('version', function () {
    if (!lernaJSON.version) {
        throw new Error("version property is missing from lerna.json");
    }

    var version = lernaJSON.version;
    var jsonPattern = /"version": "[.0-9\-a-z]*"/;
    var jsPattern = /version: '[.0-9\-a-z]*'/;
    var glob = [
        './package.json',
        './bower.json',
        './package.js'
    ];

    gulp.src(glob, {base: './'})
        .pipe(replace(jsonPattern, '"version": "' + version + '"'))
        .pipe(replace(jsPattern, "version: '" + version + "'"))
        .pipe(gulp.dest('./'));
});

gulp.task('bower', ['version'], function (cb) {
    bower.commands.install().on('end', function (installed) {
        console.log(installed);
        cb();
    });
});

gulp.task('lint', [], function () {
    return gulp.src(['./*.js', './lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', ['lint'], function (cb) {
    del([DEST]).then(cb.bind(null, null));
});

packages.forEach(function (pckg, i) {
    var prevPckg = (!i) ? 'clean' : packages[i - 1].fileName;

    gulp.task(pckg.fileName, [prevPckg], function () {
        browserifyOptions.standalone = pckg.expose;

        var pipe = browserify(browserifyOptions)
            .require(pckg.src, { expose: pckg.expose })
            .require('bn.js', { expose: 'BN' }) // expose it to dapp developers
            .add(pckg.src);

        if (pckg.ignore) {
            pckg.ignore.forEach(function (ignore) {
                pipe.ignore(ignore);
            });
        }

        return pipe.bundle()
            .pipe(exorcist(path.join(DEST, pckg.fileName + '.js.map')))
            .pipe(source(pckg.fileName + '.js'))
            .pipe(streamify(babel({
                compact: false,
                presets: ['env']
            })))
            .pipe(gulp.dest(DEST))
            .pipe(streamify(babel({
                compact: true,
                presets: ['env']
            })))
            .pipe(streamify(uglify(ugliyOptions)))
            .on('error', function (err) { console.error(err); })
            .pipe(rename(pckg.fileName + '.min.js'))
            .pipe(gulp.dest(DEST));
    });
});


gulp.task('publishTag', function () {
    exec("git commit -am \"add tag v"+ lernaJSON.version +"\"; git tag v"+ lernaJSON.version +"; git push origin v"+ lernaJSON.version +";");
});

gulp.task('watch', function () {
    gulp.watch(['./packages/web3/src/*.js'], ['lint', 'build']);
});

gulp.task('all', ['version', 'lint', 'clean', packages[packages.length - 1].fileName]);

gulp.task('default', ['version', 'lint', 'clean', packages[0].fileName]);

