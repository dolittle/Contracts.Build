// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { GenerateOptions } from './GenerateOptions';
import { GenerationTarget } from './GenerationTarget';

type GenerateActionCallback = (options: GenerateOptions) => Promise<void> | void;

type Options = {
    O: string,
    I: string[],
    R: string[],
    skipEmptyFiles?: boolean,
}

export const generateAction = (target: GenerationTarget, action: GenerateActionCallback) => {
    return (paths: string[], options: Options) => {
        action({ 
            target,
            output: options.O,
            paths,
            includes: options.I ?? [],
            rewrites: (options.R ?? []).map(_ => {
                const [from, to] = _.split(':',2);
                const [pkg, pkgName] = to.split('=', 2);
                if (pkg === 'pkg') {
                    return { from, to: pkgName, package: true };
                } else {
                    return { from, to, package: false };
                }
            }),
            skipEmptyFiles: !!options.skipEmptyFiles,
        });
    }
}