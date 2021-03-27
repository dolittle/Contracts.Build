// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'process';
import { Command, Option } from 'commander';

import { repeated } from './repeated';
import { generateAction } from './generateAction';
import { GenerationTarget } from './GenerationTarget';
import { Generator } from './Generator';

const generator = new Generator('./build');

const program = new Command('dolittle_proto_build');

const includes = new Option('-I <path>', 'Include path (multiple allowed)');
const rewrite = new Option('-R <rewrite>', 'Rewrite file paths (multiple allowed)');
const skipEmptyFiles = new Option('--skip-empty-files', 'Remove files generated without any content');

program
    .command('grpc-node <paths...>')
    .addOption(repeated(includes))
    .addOption(repeated(rewrite))
    .addOption(skipEmptyFiles)
    .description('Generate gRPC code for NodeJS')
    .action(generateAction(GenerationTarget.Node, options => generator.generate(options)));

program
    .command('grpc-web <paths...>')
    .addOption(repeated(includes))
    .addOption(repeated(rewrite))
    .addOption(skipEmptyFiles)
    .description('Generate gRPC code for browsers')
    .action(generateAction(GenerationTarget.Web, options => generator.generate(options)));

program.parse(process.argv);
