# [4.0.0] - 2022-3-4 [PR: #24](https://github.com/dolittle/Protobuf/pull/24)
## Summary

Update gRPC and Protobuf package dependencies to latest versions and remove unneeded packages.

### Removes
- The gRPC package dependency, it should not be necessary to build gRPC projects.

### Changes
- Update gRPC and Protobuf package versions.


# [3.3.1] - 2021-11-30 [PR: #23](https://github.com/dolittle/Protobuf/pull/23)
## Summary

Turns back on compilation of generated .NET protobuf code - to make build pipelines with other sources that rely on the generated code works. To be hones I have no idea how these files were actually built in the end - but it must have worked somehow.

### Fixed

- Turn compilation of generated .NET protobuf source back on, and make errors go away by generating empty service files.


# [3.3.0] - 2021-11-30 [PR: #21](https://github.com/dolittle/Protobuf/pull/21)
## Summary

Add ability to keep some source files for .NET protobuf build projects.

### Added

- The `<DolittleProtoKeepFiles>` MSbuild property that excludes the listed files from the `DeleteSourceFiles` target.


# [3.2.0] - 2021-10-19 [PR: #18](https://github.com/dolittle/Protobuf/pull/18)
## Summary

Updates the versions of the Grpc and protobuf packages

### Fixed

- Updated Grpc and protobuf versions


# [3.1.3] - 2021-3-27 [PR: #17](https://github.com/dolittle/Protobuf/pull/17)
## Summary

Changed config of the TS compiler so that it `uses @grpc/grpc-js` imports.

### Fixed

- Changed config of the TS compiler so that it `uses @grpc/grpc-js` imports.


# [3.1.2] - 2021-3-27 [PR: #16](https://github.com/dolittle/Protobuf/pull/16)
## Summary

Adding support for rewriting `import ... from "...";` in addition to `require('...')` statements in the JS/TS generator.

### Changed

- The JS/TS generator cli now rewrites both `require('...')` and `import ... from "...";`.


# [3.1.1] - 2021-3-27 [PR: #15](https://github.com/dolittle/Protobuf/pull/15)
## Summary

Fix bug where no rewrites or includes were provided to JS/TS generator cli.

### Fixed

- Defaulting to empty arrays for rewrites and includes for the JS/TS generator cli.


# [3.1.0] - 2021-3-27 [PR: #14](https://github.com/dolittle/Protobuf/pull/14)
## Summary

Added support for specifying output directory for JS/TS generator

### Added

- Support `-O <path>` option for the JS/TS generator cli.


# [3.0.0] - 2021-3-27 [PR: #13](https://github.com/dolittle/Protobuf/pull/13)
## Summary

Reimplemented the JS/TS generations scripts to clean up a little bit, and to support more of the features that makes sense for dolittle/Contracts. The grpc-web generation has been removed until we have more experience with it and need it again.

### Added

- Ignoring empty gRPC service files before publish
- Rewriting import paths to support more accurate package structure and multi-package generation

### Changed

- The JS _binary_ has been replaced with a commander CLI (supporting the same style of execution)

### Deprecated

- grpc-web generation is not supported for now until we need it again.


# [2.0.6] - 2021-3-24 [PR: #12](https://github.com/dolittle/Protobuf/pull/12)
## Summary

Set npm registry address to force use of NODE_AUTH_TOKEN


# [2.0.5] - 2021-3-24 [PR: #11](https://github.com/dolittle/Protobuf/pull/11)
## Summary

Use `npm version` to set new version before publishing package.


# [2.0.4] - 2021-3-24 [PR: #10](https://github.com/dolittle/Protobuf/pull/10)
## Summary

Change from using `yarn` to `npm` for publishing package.


# [2.0.3] - 2021-3-24 [PR: #9](https://github.com/dolittle/Protobuf/pull/9)
## Summary

Adds `always-auth: true` to fix authentication for `yarn publish`.


# [2.0.2] - 2021-3-24 [PR: #8](https://github.com/dolittle/Protobuf/pull/8)
## Summary
This PR is here to force a release of #7 . That PR included updates to the JS dependency versions, and added a release pipeline for NPM.

### Added

- Release pipeline for JS

### Fixed

- Updated JS dependencies


