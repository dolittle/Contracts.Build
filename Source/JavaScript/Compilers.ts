// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import execa from 'execa';

const ProtocPath = require.resolve('grpc-tools/bin/protoc.js');
const ProtocPluginPath = require.resolve('grpc-tools/bin/protoc_plugin.js');
const ProtocTSPluginPath = require.resolve('grpc_tools_node_protoc_ts/bin/protoc-gen-ts');

export const protoc = async (...args: string[]): Promise<void> => {
    try {
        await execa('node', [ProtocPath, `--plugin=protoc-gen-grpc=${ProtocPluginPath}`, ...args]);
    } catch (error) {
        throw error.stderr;
    }
}

export const protocTS = async (...args: string[]): Promise<void> => {
    try {
        await execa('node', [ProtocPath, `--plugin=protoc-gen-ts=${ProtocTSPluginPath}`, ...args]);
    } catch (error) {
        throw error.stderr;
    }
}
