#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const commander_1 = __importDefault(require("commander"));
const server_1 = __importDefault(require("./server"));
const build_1 = __importDefault(require("./build"));
commander_1.default.version('0.0.2');
commander_1.default.arguments('<mode> [name]');
commander_1.default.option('--mini', 'Minify code.');
commander_1.default.option('--readonly', 'Enable readonly mode.');
commander_1.default.option('--conf <target>', 'Select Config File.', '');
commander_1.default.option('--lang <target>', 'Main language, default is zh.', 'zh');
commander_1.default.option('--port <target>', 'Service prot, default is 8080.', '8080');
commander_1.default.option('--host <target>', 'Service host, default is localhost.', 'localhost');
commander_1.default.action((mode, name = 'my-project') => {
    let rootDir = './src';
    let outputDir = './dist';
    let lang = commander_1.default.lang;
    let host = commander_1.default.host;
    let port = Number(commander_1.default.port);
    let readonly = !!commander_1.default.readonly;
    if (mode === 'init') {
        fs_extra_1.default.copySync(`${__dirname}/../example`, `./${name}`);
        console.log('Inited');
        process.exit();
    }
    if (mode === 'build') {
        let conf = {};
        if (commander_1.default.conf) {
            conf = JSON.parse(fs_extra_1.default.readFileSync(commander_1.default.conf).toString());
        }
        build_1.default({
            config: conf,
            env: 'prod',
            lang,
            readonly,
            mini: !!commander_1.default.mini,
            rootDir,
            outputDir
        });
    }
    if (mode === 'serve') {
        server_1.default({
            port,
            host,
            lang,
            confPath: commander_1.default.conf,
            rootDir,
            outputDir: './.dev'
        });
    }
});
commander_1.default.parse(process.argv);
