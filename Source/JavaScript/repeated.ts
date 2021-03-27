// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import commander from 'commander';

const parser = (next: string, previous: string[]): string[] => {
    previous = previous ?? [];
    previous.push(next);
    return previous;
}

export const repeated = (option: commander.Option): commander.Option => {
    option.argParser(parser);
    return option;
}
