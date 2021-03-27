// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import os from 'os';
import process from 'process';
import { dirname as pathDirname, join as pathJoin, relative as pathRelative, normalize as pathNormalize, resolve as pathResolve } from 'path';
import { mkdir, mkdtemp, readdir, readFile, rmdir, stat, writeFile } from 'fs/promises';

import { protoc, protocTS } from './Compilers';
import { GenerateOptions } from './GenerateOptions';
import { GenerationTarget } from './GenerationTarget';

const regexpEscape = (expression: string): string => 
    expression.replace('\\','\\\\').replace('/','\\/').replace('(','\\(').replace(')','\\)');

export class Generator {
    async generate(options: GenerateOptions): Promise<void> {
        try {
            console.log('Generating code for', options.target);
            console.log('With includes', options.includes.join(' '));
            console.log('With rewrites', options.rewrites.map(_ => `${_.from}:${_.to}`).join(' '));
            console.log('To directory', options.output);

            await this.ensureCleanOutputDirectory(options);
            const protoFiles = await this.findAllProtoFilesIn(...options.paths);

            const tmpDir = await this.createTemporaryBuildDirectory();

            switch (options.target) {
                case GenerationTarget.Node:
                    await this.generateNodeCode(options, protoFiles, tmpDir);
                    break;
                default:
                    throw new Error(`Target '${options.target}' not implemented`);
            }

            await this.moveGeneratedFilesToOutputDirectory(options, tmpDir);
        } catch (error) {
            console.error('Generation failed', error);
        }
    }

    private async generateNodeCode(options: GenerateOptions, protoFiles: string[], buildDir: string) {
        for (const protoFile of protoFiles) {
            console.log('Generating', protoFile);
            await protoc(
                `--js_out=import_style=commonjs,binary:${buildDir}`,
                `--grpc_out=grpc_js:${buildDir}`,
                ...options.includes.map(_ => `-I${_}`),
                protoFile);
            await protocTS(
                `--ts_out=grpc_js:${buildDir}`,
                ...options.includes.map(_ => `-I${_}`),
                protoFile);
        }
    }

    private async moveGeneratedFilesToOutputDirectory(options: GenerateOptions, buildDir: string): Promise<void> {
        const generatedFiles = await this.findAllFilesIn(buildDir);

        for (const generatedFile of generatedFiles) {
            const filePath = pathRelative(buildDir, generatedFile);
            const rewrittenPath = this.getRewrittenFilePath(options, filePath);

            const contents = (await readFile(generatedFile)).toString();
            const [rewrittenContents, shouldInclude] = this.getRewrittenFileContents(options, contents);

            if (!shouldInclude) continue;

            const movedFilePath = pathJoin(options.output, rewrittenPath);
            const movedFileDirectory = pathDirname(movedFilePath);
            await mkdir(movedFileDirectory, { recursive: true });
            await writeFile(movedFilePath, rewrittenContents);
        }

        await rmdir(buildDir, { recursive: true });
    }

    private getRewrittenFilePath(options: GenerateOptions, filePath: string): string {
        for (const rewrite of options.rewrites) {
            if (!rewrite.package && filePath.startsWith(rewrite.from)) {
                return rewrite.to + filePath.substr(rewrite.from.length);
            }
        }
        return filePath;
    }

    private getRewrittenFileContents(options: GenerateOptions, contents: string): [string, boolean] {
        if (contents.startsWith('// GENERATED CODE -- NO SERVICES IN PROTO') && options.skipEmptyFiles) {
            return [contents, false];
        }

        const importReplacements = this.findImportsToReplaceInContent(options, contents, `from "`, `";`);
        const requireReplacements = this.findImportsToReplaceInContent(options, contents, `require('`, `');`);

        for (const [from, to] of importReplacements.concat(requireReplacements)) {
            contents = contents.replace(from, to);
        }

        return [contents, true];
    }

    private findImportsToReplaceInContent(options: GenerateOptions, contents: string, prefix: string, postfix: string): [string, string][] {
        const replacements: [string, string][] = [];
        for (const {from, to, package: pkg} of options.rewrites) {
            const re = new RegExp(`${regexpEscape(prefix)}(.*${regexpEscape(from)}.*)${regexpEscape(postfix)}`, 'g');
            for (const match of contents.matchAll(re)) {
                let [before, after] = match[1].split(from, 2);

                let replacement = match[0];
                if (pkg) {
                    replacement = prefix+to+after+postfix;
                } else {
                    if (before.endsWith('../')) {
                        before = before.substr(0, before.length-3);
                    }
                    replacement = prefix+before+to+after+postfix;
                }
                replacements.push([match[0], replacement]);
            }
        }
        return replacements;
    }

    private async ensureCleanOutputDirectory(options: GenerateOptions): Promise<void> {
        const currentDirectory = pathResolve(process.cwd());
        const outputDirectory = pathResolve(options.output);
        if (currentDirectory.startsWith(outputDirectory)) {
            console.log('Output directory includes current directory, not cleaning');
            return;
        }
        try {
            const info = await stat(outputDirectory);
            if (info.isDirectory()) {
                await rmdir(outputDirectory, { recursive: true });
            } else {
                throw new Error(`Output directory '${options.output}' is not a directory`);
            }
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        await mkdir(outputDirectory, { recursive: true });
    }

    private async createTemporaryBuildDirectory(): Promise<string> {
        return await mkdtemp(pathJoin(os.tmpdir(), 'dolittle-grpc-'));
    }

    private async findAllFilesIn(...paths: string[]): Promise<string[]> {
        const files: string[] = [];
        for (const path of paths) {
            const fileInfo = await stat(path);
            if (fileInfo.isDirectory()) {
                const filesInDirectory = (await readdir(path)).map(_ => pathJoin(path, _));
                files.push(...await this.findAllFilesIn(...filesInDirectory));
            } else if (fileInfo.isFile()) {
                files.push(path);
            }
        }
        return files;
    }

    private async findAllProtoFilesIn(...paths: string[]): Promise<string[]> {
        return (await this.findAllFilesIn(...paths)).filter(_ => _.endsWith('.proto'));
    }
}