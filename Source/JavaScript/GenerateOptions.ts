// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { GenerationTarget } from './GenerationTarget';

export type GenerateOptions = {
    readonly target: GenerationTarget;
    readonly output: string;
    readonly paths: readonly string[];
    readonly includes: readonly string[];
    readonly rewrites: readonly {readonly from: string, readonly to: string, readonly package: boolean}[];
    readonly skipEmptyFiles: boolean;
}